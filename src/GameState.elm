module GameState exposing (..)

import Computation exposing (Computation)
import Dict exposing (Dict)
import Keyboard
import Keyboard.Arrows as Arrows
import Physical.Ball as Ball exposing (Ball)
import Physical.Bullet as Bullet exposing (Bullet)
import Physical.Field as Field
import Physical.Player as Player exposing (Player)
import SideEffect exposing (SideEffect)
import Time


type alias GameState =
    { startTime : Time.Posix
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


type GameEffects
    = NoEffect


type alias GameStepComputation =
    -- GameState -> ( GameState, SideEffect )
    Computation GameState (SideEffect GameEffects)


type alias Four a =
    { one : a
    , two : a
    , three : a
    , four : a
    }


update : Time.Posix -> Int -> List Keyboard.Key -> GameState -> GameState
update newFrameTime duration keys gameState =
    let
        -- process keyboard inputs
        thrustArrowsDirection =
            Arrows.arrowsDirection keys

        spaceBarDown =
            List.member Keyboard.Spacebar keys

        newDirections =
            { one = fromArrows thrustArrowsDirection gameState.player1.direction
            , two = gameState.player2.direction
            , three = gameState.player3.direction
            , four = gameState.player4.direction
            }

        newThrustings =
            { one = thrustArrowsDirection /= Arrows.NoDirection
            , two = gameState.player2.thrusting
            , three = gameState.player3.thrusting
            , four = gameState.player4.thrusting
            }
    in
    gameState
        |> preparePlayers duration newDirections newThrustings
        |> moveAllUntil newFrameTime


preparePlayers : Int -> Four Float -> Four Bool -> GameState -> GameState
preparePlayers duration directions thrustings gameState =
    let
        newPlayer1 =
            Player.prepareMovement duration thrustings.one directions.one gameState.player1

        newPlayer2 =
            Player.prepareMovement duration thrustings.two directions.two gameState.player2
    in
    { gameState
        | player1 = newPlayer1
        , player2 = newPlayer2
    }


moveAllUntil : Time.Posix -> GameState -> GameState
moveAllUntil newFrameTime gameState =
    let
        newPlayer1 =
            Player.moveUntil newFrameTime gameState.player1
                |> Player.checkWallObstacle 0 Field.width 0 Field.height

        newPlayer2 =
            Player.moveUntil newFrameTime gameState.player2
                |> Player.checkWallObstacle 0 Field.width 0 Field.height
    in
    { gameState
        | player1 = newPlayer1
        , player2 = newPlayer2
    }


fromArrows : Arrows.Direction -> Float -> Float
fromArrows arrowsDirection previousDirection =
    case arrowsDirection of
        Arrows.North ->
            north

        Arrows.NorthEast ->
            northEast

        Arrows.East ->
            east

        Arrows.SouthEast ->
            southEast

        Arrows.South ->
            south

        Arrows.SouthWest ->
            southWest

        Arrows.West ->
            west

        Arrows.NorthWest ->
            northWest

        _ ->
            previousDirection


north : Float
north =
    -pi / 2


northEast : Float
northEast =
    -pi / 4


east : Float
east =
    0


southEast : Float
southEast =
    pi / 4


south : Float
south =
    pi / 2


southWest : Float
southWest =
    3 * pi / 4


west : Float
west =
    pi


northWest : Float
northWest =
    -3 * pi / 4
