module Data.Game exposing
    ( Balls
    , Game
    , allPlayers
    , init
    , update
    )

import Data.Helper exposing (Four, OneOfFour(..))
import Data.Vector as Vector
import Dict exposing (Dict)
import Physical.Ball as Ball exposing (Ball)
import Physical.Bullet as Bullet exposing (Bullet)
import Physical.Field as Field
import Physical.Player as Player exposing (Player)
import Processing.Collision as Collision
import Time


type alias Game =
    { startTime : Time.Posix
    , frameTime : Time.Posix
    , uniqueId : Int
    , score : ( Int, Int )
    , player1 : Player
    , player2 : Player
    , player3 : Player
    , player4 : Player
    , bullets : Dict Int PlayerBullet
    , balls : Balls
    }


type alias PlayerBullet =
    { playerId : OneOfFour
    , bullet : Bullet
    }


type alias Balls =
    { inGame : Dict Int Ball
    , incoming : List Int
    , timer : BallTimer
    }


type BallTimer
    = WaitingForFreeSpace
    | FreeSince Time.Posix


init : Time.Posix -> Game
init startTime =
    { startTime = startTime
    , frameTime = startTime
    , uniqueId = 0
    , score = ( 0, 0 )
    , player1 = Player.init startTime 0 Field.placePlayer1
    , player2 = Player.init startTime 0 Field.placePlayer2
    , player3 = Player.init startTime pi Field.placePlayer3
    , player4 = Player.init startTime pi Field.placePlayer4
    , bullets = Dict.empty
    , balls = Balls Dict.empty [ 0, 1, 2 ] (FreeSince startTime)
    }


allPlayers : Game -> List Player
allPlayers { player1, player2, player3, player4 } =
    [ player1, player2, player3, player4 ]


update : Time.Posix -> Int -> Four Player.Control -> Game -> Game
update newFrameTime duration playerControls game =
    let
        newDirections =
            { one = Maybe.withDefault game.player1.direction playerControls.one.thrusting
            , two = Maybe.withDefault game.player2.direction playerControls.two.thrusting
            , three = Maybe.withDefault game.player3.direction playerControls.three.thrusting
            , four = Maybe.withDefault game.player4.direction playerControls.four.thrusting
            }

        newThrustings =
            { one = not (isNothing playerControls.one.thrusting)
            , two = not (isNothing playerControls.two.thrusting)
            , three = not (isNothing playerControls.three.thrusting)
            , four = not (isNothing playerControls.four.thrusting)
            }

        newShotKeys =
            { one = playerControls.one.holdingShot
            , two = playerControls.two.holdingShot
            , three = playerControls.three.holdingShot
            , four = playerControls.four.holdingShot
            }
    in
    game
        |> changeGameBalls newFrameTime duration
        |> preparePlayers duration newDirections newThrustings
        |> processCollisionsUntil newFrameTime
        |> moveAllUntil newFrameTime
        |> spawnAllBullets newShotKeys


isNothing : Maybe a -> Bool
isNothing maybe =
    case maybe of
        Nothing ->
            True

        _ ->
            False



-- PREPARATION #######################################################


preparePlayers : Int -> Four Float -> Four Bool -> Game -> Game
preparePlayers duration directions thrustings game =
    let
        newPlayer1 =
            Player.prepareMovement duration thrustings.one directions.one game.player1

        newPlayer2 =
            Player.prepareMovement duration thrustings.two directions.two game.player2

        newPlayer3 =
            Player.prepareMovement duration thrustings.three directions.three game.player3

        newPlayer4 =
            Player.prepareMovement duration thrustings.four directions.four game.player4
    in
    { game
        | player1 = newPlayer1
        , player2 = newPlayer2
        , player3 = newPlayer3
        , player4 = newPlayer4
    }



-- COLLISIONS ########################################################


processCollisionsUntil : Time.Posix -> Game -> Game
processCollisionsUntil endTime game =
    allCollisions endTime game
        |> List.sortBy .time
        -- |> Debug.log "allCollisions"
        |> List.foldl processCollision game


processCollision : { time : Float, kind : Collision.Kind } -> Game -> Game
processCollision { time, kind } game =
    case kind of
        -- bullet - wall
        Collision.BulletWall id _ ->
            { game | bullets = Dict.remove id game.bullets }

        -- bullet - ball
        Collision.BulletBall bulletId ballId ->
            -- TODO later: if medium size bullet, do not destroy?
            impactIdentifiedBulletOnBall time bulletId ballId game

        -- player - bullet
        Collision.PlayerBullet oneOfFour bulletId ->
            impactIdentifiedBulletOnPlayer time bulletId oneOfFour game

        -- ball - ball
        -- https://en.m.wikipedia.org/wiki/Elastic_collision
        Collision.BallBall id1 id2 ->
            impactBallBall time id1 id2 game

        -- ball - wall
        Collision.BallWall ballId wall ->
            impactBallWall time ballId wall game

        _ ->
            game


impactBallWall : Float -> Int -> Field.Wall -> Game -> Game
impactBallWall time ballId wall ({ balls } as game) =
    case ( Dict.get ballId balls.inGame, wall ) of
        ( Just ball, Field.Top ) ->
            let
                movedBall =
                    Ball.moveDuring time ball

                ( vX, vY ) =
                    movedBall.speed

                newBall =
                    { movedBall | speed = ( vX, max -vY vY ) }

                ballsInGame =
                    Dict.insert ballId newBall balls.inGame
            in
            { game | balls = { balls | inGame = ballsInGame } }

        ( Just ball, Field.Bottom ) ->
            let
                movedBall =
                    Ball.moveDuring time ball

                ( vX, vY ) =
                    movedBall.speed

                newBall =
                    { movedBall | speed = ( vX, min -vY vY ) }

                ballsInGame =
                    Dict.insert ballId newBall balls.inGame
            in
            { game | balls = { balls | inGame = ballsInGame } }

        ( Just ball, Field.Left ) ->
            let
                newBalls =
                    { balls
                        | inGame = Dict.remove ballId balls.inGame
                        , incoming = ballId :: balls.incoming
                    }
            in
            { game | balls = newBalls, score = Tuple.mapSecond ((+) 1) game.score }

        ( Just ball, Field.Right ) ->
            let
                newBalls =
                    { balls
                        | inGame = Dict.remove ballId balls.inGame
                        , incoming = ballId :: balls.incoming
                    }
            in
            { game | balls = newBalls, score = Tuple.mapFirst ((+) 1) game.score }

        _ ->
            game


impactBallBall : Float -> Int -> Int -> Game -> Game
impactBallBall time id1 id2 ({ balls } as game) =
    case ( Dict.get id1 balls.inGame, Dict.get id2 balls.inGame ) of
        ( Just ball1, Just ball2 ) ->
            let
                b1 =
                    Ball.moveDuring time ball1

                b2 =
                    Ball.moveDuring time ball2

                speedDiff =
                    Vector.diff b1.speed b2.speed

                centerDiff =
                    Vector.diff b1.pos b2.pos

                squareDistance =
                    0.000001 + Vector.norm2 centerDiff

                newSpeed1 =
                    centerDiff
                        |> Vector.times (Vector.dot speedDiff centerDiff / squareDistance)
                        |> Vector.diff b1.speed

                newSpeed2 =
                    centerDiff
                        |> Vector.times (Vector.dot speedDiff centerDiff / squareDistance)
                        |> Vector.add b2.speed

                newBall1 =
                    { b1 | speed = newSpeed1 }

                newBall2 =
                    { b2 | speed = newSpeed2 }

                ballsInGame =
                    Dict.insert id1 newBall1 balls.inGame
                        |> Dict.insert id2 newBall2
            in
            { game | balls = { balls | inGame = ballsInGame } }

        _ ->
            game


impactIdentifiedBulletOnPlayer : Float -> Int -> OneOfFour -> Game -> Game
impactIdentifiedBulletOnPlayer time bulletId oneOfFour game =
    case ( Dict.get bulletId game.bullets, oneOfFour ) of
        ( Just { bullet }, Un ) ->
            { game
                | player1 = impactBulletOnPlayer time bullet game.player1
                , bullets = Dict.remove bulletId game.bullets
            }

        ( Just { bullet }, Deux ) ->
            { game
                | player2 = impactBulletOnPlayer time bullet game.player2
                , bullets = Dict.remove bulletId game.bullets
            }

        ( Just { bullet }, Trois ) ->
            { game
                | player3 = impactBulletOnPlayer time bullet game.player3
                , bullets = Dict.remove bulletId game.bullets
            }

        ( Just { bullet }, Quatre ) ->
            { game
                | player4 = impactBulletOnPlayer time bullet game.player4
                , bullets = Dict.remove bulletId game.bullets
            }

        _ ->
            game


impactBulletOnPlayer : Float -> Bullet -> Player -> Player
impactBulletOnPlayer time bullet player =
    let
        movedPlayer =
            Player.moveDuring time player

        ( speedX, speedY ) =
            player.speed

        newSpeed =
            ( speedX + 0.5 * cos bullet.direction
            , speedY + 0.5 * sin bullet.direction
            )
    in
    case player.stunned of
        Nothing ->
            Player.stun { movedPlayer | speed = newSpeed }

        _ ->
            { movedPlayer | speed = newSpeed }


impactIdentifiedBulletOnBall : Float -> Int -> Int -> Game -> Game
impactIdentifiedBulletOnBall time id ballId game =
    case Dict.get id game.bullets of
        Nothing ->
            game

        Just { bullet } ->
            { game
                | bullets = Dict.remove id game.bullets
                , balls = updateBallWithId (impactBulletOnBall time bullet) ballId game.balls
            }


updateBallWithId : (Ball -> Ball) -> Int -> Balls -> Balls
updateBallWithId f ballId balls =
    { balls | inGame = Dict.update ballId (Maybe.map f) balls.inGame }


impactBulletOnBall : Float -> Bullet -> Ball -> Ball
impactBulletOnBall time bullet ball =
    -- Let's only take bullet direction into account for simplicity for the time being
    let
        movedBall =
            Ball.moveDuring time ball

        ( speedX, speedY ) =
            movedBall.speed

        newSpeed =
            ( speedX + 0.5 * cos bullet.direction
            , speedY + 0.5 * sin bullet.direction
            )
    in
    { movedBall | speed = newSpeed }


allCollisions : Time.Posix -> Game -> List { time : Float, kind : Collision.Kind }
allCollisions endTime ({ player1, player2, player3, player4 } as game) =
    let
        duration =
            Time.posixToMillis endTime - Time.posixToMillis game.frameTime

        allBulletsList =
            Dict.toList game.bullets
                |> List.map (Tuple.mapSecond .bullet)

        allBallsWithId =
            Dict.toList game.balls.inGame
    in
    Collision.playerPlayerAll duration player1 player2 player3 player4
        -- |> reversePrepend (Collision.playerWallAll duration player1 player2 player3 player4)
        |> reversePrepend (Collision.playerBulletAll duration player1 player2 player3 player4 allBulletsList)
        -- |> reversePrepend (Collision.playerBallAll duration player1 player2 player3 player4 allBallsWithId)
        -- |> reversePrepend (Collision.bulletBulletAll duration allBulletsList)
        |> reversePrepend (Collision.bulletBallAll duration allBulletsList allBallsWithId)
        |> reversePrepend (Collision.ballBallAll duration allBallsWithId)
        |> reversePrepend (Collision.ballWallAll duration allBallsWithId)
        |> reversePrepend (Collision.bulletWallAll duration allBulletsList)


triple : a -> b -> c -> ( a, b, c )
triple a b c =
    ( a, b, c )


reversePrepend : List a -> List a -> List a
reversePrepend list1 list2 =
    case list1 of
        [] ->
            list2

        l :: ls ->
            reversePrepend ls (l :: list2)



-- MOVE ##############################################################


{-| Move all units until new frame time and update frame time.
-}
moveAllUntil : Time.Posix -> Game -> Game
moveAllUntil newFrameTime game =
    let
        newPlayer1 =
            Player.moveUntil newFrameTime game.player1
                |> Player.checkWallObstacle 0 Field.width 0 Field.height

        newPlayer2 =
            Player.moveUntil newFrameTime game.player2
                |> Player.checkWallObstacle 0 Field.width 0 Field.height

        newPlayer3 =
            Player.moveUntil newFrameTime game.player3
                |> Player.checkWallObstacle 0 Field.width 0 Field.height

        newPlayer4 =
            Player.moveUntil newFrameTime game.player4
                |> Player.checkWallObstacle 0 Field.width 0 Field.height

        duration =
            Time.posixToMillis newFrameTime - Time.posixToMillis game.frameTime

        newBullets =
            Dict.map (\_ pB -> { pB | bullet = Bullet.move duration pB.bullet }) game.bullets

        newBalls =
            moveBallsUntil newFrameTime game.balls
    in
    { game
        | frameTime = newFrameTime
        , player1 = newPlayer1
        , player2 = newPlayer2
        , player3 = newPlayer3
        , player4 = newPlayer4
        , bullets = newBullets
        , balls = newBalls
    }



-- SPAWN BULLETS #####################################################


{-| Spawn bullets.
-}
spawnAllBullets : Four Bool -> Game -> Game
spawnAllBullets shotKeys game =
    let
        ( newPlayer1, hasShot1 ) =
            Player.updateShot shotKeys.one game.player1

        ( newPlayer2, hasShot2 ) =
            Player.updateShot shotKeys.two game.player2

        ( newPlayer3, hasShot3 ) =
            Player.updateShot shotKeys.three game.player3

        ( newPlayer4, hasShot4 ) =
            Player.updateShot shotKeys.four game.player4
    in
    { game
        | player1 = newPlayer1
        , player2 = newPlayer2
        , player3 = newPlayer3
        , player4 = newPlayer4
    }
        |> updateBullets Un hasShot1 newPlayer1
        |> updateBullets Deux hasShot2 newPlayer2
        |> updateBullets Trois hasShot3 newPlayer3
        |> updateBullets Quatre hasShot4 newPlayer4


updateBullets : OneOfFour -> Player.HasShot -> Player -> Game -> Game
updateBullets oneOfFour hasShot player game =
    case hasShot of
        Player.NoShot ->
            game

        Player.ShotAfter chargeTime ->
            let
                newPlayer =
                    Player.shotRecoil player

                playerBullet =
                    { playerId = oneOfFour
                    , bullet = spawnPlayerBullet chargeTime player
                    }

                newBullets =
                    Dict.insert game.uniqueId playerBullet game.bullets

                newId =
                    game.uniqueId + 1
            in
            case oneOfFour of
                Un ->
                    { game | player1 = newPlayer, uniqueId = newId, bullets = newBullets }

                Deux ->
                    { game | player2 = newPlayer, uniqueId = newId, bullets = newBullets }

                Trois ->
                    { game | player3 = newPlayer, uniqueId = newId, bullets = newBullets }

                Quatre ->
                    { game | player4 = newPlayer, uniqueId = newId, bullets = newBullets }


spawnPlayerBullet : Int -> Player -> Bullet
spawnPlayerBullet duration player =
    let
        bulletSize =
            Bullet.Small

        creationDistance =
            -- add 1.0 to make sure player and bullets don't collide immediately
            1.0 + Player.size + Bullet.smallSize

        ( x, y ) =
            player.pos

        bulletPos =
            ( x + creationDistance * cos player.direction
            , y + creationDistance * sin player.direction
            )
    in
    Bullet.new bulletSize player.direction bulletPos



-- MANAGING BALLS ####################################################


{-| Let's say for now that we only have OutOfGoal balls.
-}
moveBallsUntil : Time.Posix -> Balls -> Balls
moveBallsUntil newFrameTime balls =
    { balls | inGame = Dict.map (\_ ball -> Ball.moveUntil newFrameTime ball) balls.inGame }


changeGameBalls : Time.Posix -> Int -> Game -> Game
changeGameBalls newFrameTime duration game =
    let
        newBalls =
            game.balls
                -- |> Debug.log "game.balls"
                |> prepareBallsMovements (toFloat duration)
                |> checkStartBallCounter newFrameTime
                |> checkSpawnBall newFrameTime
    in
    { game | balls = newBalls }


{-| There should only be OutOfGoal balls at this time
since that happens before collisions and movements.
-}
prepareBallsMovements : Float -> Balls -> Balls
prepareBallsMovements duration balls =
    { balls | inGame = Dict.map (\_ ball -> Ball.prepareMovement duration ball) balls.inGame }


checkSpawnBall : Time.Posix -> Balls -> Balls
checkSpawnBall frameTime ({ inGame, incoming, timer } as balls) =
    case ( incoming, timer ) of
        ( ballId :: otherBallIds, FreeSince timerStartTime ) ->
            if timeDiff timerStartTime frameTime > ballTimer then
                Balls (Dict.insert ballId (Ball.init frameTime) inGame) otherBallIds WaitingForFreeSpace

            else
                balls

        _ ->
            balls


checkStartBallCounter : Time.Posix -> Balls -> Balls
checkStartBallCounter frameTime ({ inGame, incoming, timer } as balls) =
    if timer == WaitingForFreeSpace && not (List.isEmpty incoming) && centerIsFree inGame then
        { balls | timer = FreeSince frameTime }

    else
        balls


centerIsFree : Dict Int Ball -> Bool
centerIsFree ballsInGame =
    Dict.values ballsInGame
        |> List.all (\ball -> Ball.squareDistanceFrom Field.center ball > 4 * Ball.size * Ball.size)


ballTimer : Int
ballTimer =
    2000


timeDiff : Time.Posix -> Time.Posix -> Int
timeDiff t1 t2 =
    Time.posixToMillis t2 - Time.posixToMillis t1
