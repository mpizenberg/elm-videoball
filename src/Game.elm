module Game exposing (..)

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
