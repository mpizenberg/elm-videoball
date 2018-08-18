module Main exposing (..)

import Browser
import Browser.Events
import Game
import Html exposing (Html)
import Physical.Ball
import Physical.Block
import Physical.Bullet
import Physical.Field
import Physical.Player
import Ports
import Time
import Views.Svg.Bullet
import Views.Svg.Field
import Views.Svg.Player


main : Program Flags Model Msg
main =
    Browser.element
        { init = init
        , view = view
        , update = update
        , subscriptions = subscriptions
        }


type alias Flags =
    { time : Int
    , size : Size
    }


type alias Size =
    { width : Float
    , height : Float
    }


type alias Model =
    { size : Size
    , frameSize : Size
    , frameTime : Time.Posix
    }


type Msg
    = NewFrame Time.Posix
    | Resizes Size


init : Flags -> ( Model, Cmd Msg )
init { time, size } =
    ( { size = size
      , frameSize = size
      , frameTime = Time.millisToPosix time
      }
    , Cmd.none
    )


subscriptions : Model -> Sub Msg
subscriptions _ =
    Sub.batch
        [ Browser.Events.onAnimationFrame NewFrame
        , Ports.resizes Resizes
        ]


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        Resizes size ->
            ( { model | size = size }, Cmd.none )

        NewFrame time ->
            ( { model
                | frameSize = model.size
                , frameTime = time
              }
            , Cmd.none
            )


view : Model -> Html Msg
view model =
    Html.div [] [ Html.text (Debug.toString model) ]
