module GameState exposing (..)

import Collision exposing (OneOfFour(..), OneOfThree(..))
import Controller.Keyboard as Keyboard
import Dict exposing (Dict)
import Physical.Ball as Ball exposing (Ball)
import Physical.Bullet as Bullet exposing (Bullet)
import Physical.Field as Field
import Physical.Player as Player exposing (Player)
import SideEffect exposing (SideEffect)
import Time


type alias GameState =
    { startTime : Time.Posix
    , frameTime : Time.Posix
    , frameId : Int
    , score : ( Int, Int )
    , player1 : Player
    , player2 : Player
    , player3 : Player
    , player4 : Player
    , bullets1 : Dict Int Bullet
    , bullets2 : Dict Int Bullet
    , bullets3 : Dict Int Bullet
    , bullets4 : Dict Int Bullet
    , balls : Balls
    }


type Balls
    = NoBall Time.Posix
    | OneBall Time.Posix Ball
    | TwoBalls Time.Posix Ball Ball
    | ThreeBalls Ball Ball Ball


init : Time.Posix -> GameState
init startTime =
    { startTime = startTime
    , frameTime = startTime
    , frameId = 0
    , score = ( 0, 0 )
    , player1 = Player.init startTime 0 Field.placePlayer1
    , player2 = Player.init startTime 0 Field.placePlayer2
    , player3 = Player.init startTime pi Field.placePlayer3
    , player4 = Player.init startTime pi Field.placePlayer4
    , bullets1 = Dict.empty
    , bullets2 = Dict.empty
    , bullets3 = Dict.empty
    , bullets4 = Dict.empty
    , balls = NoBall startTime
    }


players : GameState -> List Player
players { player1, player2, player3, player4 } =
    [ player1, player2, player3, player4 ]


type alias Four a =
    { one : a
    , two : a
    , three : a
    , four : a
    }


update : Time.Posix -> Int -> List Keyboard.Key -> GameState -> GameState
update newFrameTime duration keys gameState =
    let
        ( thrusting1, direction1 ) =
            Keyboard.getThrustingAndDirection keys gameState.player1.direction

        newDirections =
            { one = direction1
            , two = gameState.player2.direction
            , three = gameState.player3.direction
            , four = gameState.player4.direction
            }

        newThrustings =
            { one = thrusting1
            , two = gameState.player2.thrusting
            , three = gameState.player3.thrusting
            , four = gameState.player4.thrusting
            }

        newShotKeys =
            { one = Keyboard.shootIsPushed keys
            , two = False
            , three = False
            , four = False
            }
    in
    gameState
        |> preparePlayers duration newDirections newThrustings
        |> processCollisionsUntil newFrameTime
        |> moveAllUntil newFrameTime
        |> spawnAllBullets newShotKeys



-- PREPARATION #######################################################


preparePlayers : Int -> Four Float -> Four Bool -> GameState -> GameState
preparePlayers duration directions thrustings gameState =
    let
        newPlayer1 =
            Player.prepareMovement duration thrustings.one directions.one gameState.player1

        newPlayer2 =
            Player.prepareMovement duration thrustings.two directions.two gameState.player2

        newPlayer3 =
            Player.prepareMovement duration thrustings.three directions.three gameState.player3

        newPlayer4 =
            Player.prepareMovement duration thrustings.four directions.four gameState.player4
    in
    { gameState
        | player1 = newPlayer1
        , player2 = newPlayer2
        , player3 = newPlayer3
        , player4 = newPlayer4
    }



-- COLLISIONS ########################################################


processCollisionsUntil : Time.Posix -> GameState -> GameState
processCollisionsUntil endTime gameState =
    allCollisions endTime gameState
        |> List.sortBy .time
        -- |> Debug.log "allCollisions"
        |> List.foldl processCollision gameState


processCollision : { time : Float, kind : Collision.Kind } -> GameState -> GameState
processCollision { time, kind } gameState =
    case kind of
        Collision.BulletWall ( Un, id ) _ ->
            { gameState | bullets1 = Dict.remove id gameState.bullets1 }

        Collision.BulletWall ( Deux, id ) _ ->
            { gameState | bullets2 = Dict.remove id gameState.bullets2 }

        Collision.BulletWall ( Trois, id ) _ ->
            { gameState | bullets3 = Dict.remove id gameState.bullets3 }

        Collision.BulletWall ( Quatre, id ) _ ->
            { gameState | bullets4 = Dict.remove id gameState.bullets4 }

        _ ->
            gameState


allCollisions : Time.Posix -> GameState -> List { time : Float, kind : Collision.Kind }
allCollisions endTime ({ player1, player2, player3, player4 } as gameState) =
    let
        duration =
            Time.posixToMillis endTime - Time.posixToMillis gameState.frameTime

        allBullets =
            Dict.values (Dict.map (triple Un) gameState.bullets1)
                |> reversePrepend (Dict.values (Dict.map (triple Deux) gameState.bullets2))
                |> reversePrepend (Dict.values (Dict.map (triple Trois) gameState.bullets3))
                |> reversePrepend (Dict.values (Dict.map (triple Quatre) gameState.bullets4))

        allBalls =
            case gameState.balls of
                NoBall _ ->
                    []

                OneBall _ ball ->
                    [ ( One, ball ) ]

                TwoBalls _ ball1 ball2 ->
                    [ ( One, ball1 ), ( Two, ball2 ) ]

                ThreeBalls ball1 ball2 ball3 ->
                    [ ( One, ball1 ), ( Two, ball2 ), ( Three, ball3 ) ]
    in
    Collision.playerPlayerAll duration player1 player2 player3 player4
        -- |> reversePrepend (Collision.playerWallAll duration player1 player2 player3 player4)
        -- |> reversePrepend (Collision.playerBulletAll duration player1 player2 player3 player4 allBullets)
        -- |> reversePrepend (Collision.playerBallAll duration player1 player2 player3 player4 allBalls)
        -- |> reversePrepend (Collision.bulletBulletAll duration allBullets)
        -- |> reversePrepend (Collision.bulletBallAll duration allBullets allBalls)
        -- |> reversePrepend (Collision.ballBallAll duration allBalls)
        -- |> reversePrepend (Collision.ballWallAll duration allBalls)
        |> reversePrepend (Collision.bulletWallAll duration allBullets)


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
moveAllUntil : Time.Posix -> GameState -> GameState
moveAllUntil newFrameTime gameState =
    let
        newPlayer1 =
            Player.moveUntil newFrameTime gameState.player1
                |> Player.checkWallObstacle 0 Field.width 0 Field.height

        newPlayer2 =
            Player.moveUntil newFrameTime gameState.player2
                |> Player.checkWallObstacle 0 Field.width 0 Field.height

        newPlayer3 =
            Player.moveUntil newFrameTime gameState.player3
                |> Player.checkWallObstacle 0 Field.width 0 Field.height

        newPlayer4 =
            Player.moveUntil newFrameTime gameState.player4
                |> Player.checkWallObstacle 0 Field.width 0 Field.height

        duration =
            Time.posixToMillis newFrameTime - Time.posixToMillis gameState.frameTime

        moveBullet _ =
            Bullet.move duration

        newBullets1 =
            Dict.map moveBullet gameState.bullets1

        newBullets2 =
            Dict.map moveBullet gameState.bullets2

        newBullets3 =
            Dict.map moveBullet gameState.bullets3

        newBullets4 =
            Dict.map moveBullet gameState.bullets4
    in
    { gameState
        | frameTime = newFrameTime
        , player1 = newPlayer1
        , player2 = newPlayer2
        , player3 = newPlayer3
        , player4 = newPlayer4
        , bullets1 = newBullets1
        , bullets2 = newBullets2
        , bullets3 = newBullets3
        , bullets4 = newBullets4
    }



-- SPAWN BULLETS #####################################################


{-| Spawn bullets and increment frameId.
-}
spawnAllBullets : Four Bool -> GameState -> GameState
spawnAllBullets shotKeys gameState =
    let
        ( newPlayer1, hasShot1 ) =
            Player.updateShot shotKeys.one gameState.player1

        ( newPlayer2, hasShot2 ) =
            Player.updateShot shotKeys.two gameState.player2

        ( newPlayer3, hasShot3 ) =
            Player.updateShot shotKeys.three gameState.player3

        ( newPlayer4, hasShot4 ) =
            Player.updateShot shotKeys.four gameState.player4

        newBullets1 =
            updateBullets gameState.frameId hasShot1 gameState.player1 gameState.bullets1

        newBullets2 =
            updateBullets gameState.frameId hasShot2 gameState.player2 gameState.bullets2

        newBullets3 =
            updateBullets gameState.frameId hasShot3 gameState.player3 gameState.bullets3

        newBullets4 =
            updateBullets gameState.frameId hasShot4 gameState.player4 gameState.bullets4
    in
    { gameState
        | player1 = newPlayer1
        , player2 = newPlayer2
        , player3 = newPlayer3
        , player4 = newPlayer4
        , bullets1 = newBullets1
        , bullets2 = newBullets2
        , bullets3 = newBullets3
        , bullets4 = newBullets4
        , frameId = gameState.frameId + 1
    }


updateBullets : Int -> Player.HasShot -> Player -> Dict Int Bullet -> Dict Int Bullet
updateBullets frameId hasShot player bullets =
    case hasShot of
        Player.NoShot ->
            bullets

        Player.ShotAfter chargeTime ->
            Dict.insert frameId (spawnPlayerBullet chargeTime player) bullets


spawnPlayerBullet : Int -> Player -> Bullet
spawnPlayerBullet _ player =
    Bullet.new Bullet.Small player.direction player.pos
