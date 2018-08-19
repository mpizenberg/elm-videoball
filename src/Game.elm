module Game exposing (..)

import Keyboard
import Keyboard.Arrows as Arrows
import Physical.Ball as Ball exposing (Ball)
import Physical.Block as Block exposing (Block)
import Physical.Bullet as Bullet exposing (Bullet)
import Physical.Field as Field
import Physical.Player as Player exposing (Player)
import Time


type alias Game =
    { startTime : Time.Posix
    , score : ( Int, Int )
    , player1 : Player
    , player2 : Player
    , player3 : Player
    , player4 : Player
    , balls : Balls
    , bullets : List Bullet
    , blocks : List Block
    }


{-| The time is the time at which it switched to this state.
Useful to visualize a timer before creation of a new ball.
-}
type Balls
    = NoBall Time.Posix
    | OneBall Time.Posix Ball
    | TwoBalls Time.Posix Ball Ball
    | ThreeBalls Ball Ball Ball


init : Time.Posix -> Game
init startTime =
    { startTime = startTime
    , score = ( 0, 0 )
    , player1 = Player.init 0 Field.placePlayer1
    , player2 = Player.init 0 Field.placePlayer2
    , player3 = Player.init pi Field.placePlayer3
    , player4 = Player.init pi Field.placePlayer4
    , balls = NoBall startTime
    , bullets = []
    , blocks = []
    }


players : Game -> List Player
players { player1, player2, player3, player4 } =
    [ player1, player2, player3, player4 ]


update : List Keyboard.Key -> Game -> Game
update keys ({ player1 } as game) =
    let
        thrustArrowsDirection =
            Arrows.arrowsDirection keys

        thrusting =
            thrustArrowsDirection /= Arrows.NoDirection

        direction =
            fromArrows thrustArrowsDirection player1.direction

        newPlayer1 =
            { player1
                | thrusting = thrusting
                , direction = direction
            }
    in
    { game | player1 = newPlayer1 }


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
