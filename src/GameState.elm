module GameState exposing (..)

import Computation exposing (Computation)
import Dict exposing (Dict)
import Keyboard
import Keyboard.Arrows as Arrows
import Physical.Ball as Ball exposing (Ball)
import Physical.Bullet as Bullet exposing (Bullet)
import Physical.Field as Field
import Physical.Player as Player exposing (Player)
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


type SideEffect
    = SideEffect


type alias GameStepComputation =
    -- GameState -> ( GameState, SideEffect )
    Computation GameState (List SideEffect)


combineEffect : SideEffect -> GameStepComputation -> GameStepComputation
combineEffect sideEffect =
    Computation.mapResult (cons sideEffect)


cons : a -> List a -> List a
cons a list =
    a :: list


update : Time.Posix -> Int -> List Keyboard.Key -> GameState -> GameState
update frameTime duration keys gameState =
    let
        -- Player 1
        player1 =
            gameState.player1

        thrustArrowsDirection =
            Arrows.arrowsDirection keys

        thrusting =
            thrustArrowsDirection /= Arrows.NoDirection

        newDirection =
            fromArrows thrustArrowsDirection player1.direction

        spaceBarDown =
            List.member Keyboard.Spacebar keys

        newPlayer1 =
            Player.prepareMovement duration thrusting newDirection player1
                |> Player.moveUntil frameTime
                |> Player.checkWallObstacle 0 Field.width 0 Field.height

        -- Player 2
        player2 =
            gameState.player2

        newPlayer2 =
            Player.prepareMovement duration False player2.direction player2
                |> Player.moveUntil frameTime
                |> Player.checkWallObstacle 0 Field.width 0 Field.height
    in
    { gameState | player1 = newPlayer1 }


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
