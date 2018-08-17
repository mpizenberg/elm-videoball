module Main exposing (..)

import Browser
import Game
import Html exposing (Html)
import Physical.Ball
import Physical.Block
import Physical.Bullet
import Physical.Field
import Physical.Player


main : Program () () ()
main =
    Browser.sandbox
        { init = ()
        , view = view
        , update = always
        }


view : () -> Html ()
view event =
    Html.div [] [ Html.text "Hello World!" ]
