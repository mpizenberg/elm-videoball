module Main exposing (..)

import Browser
import Browser.Events
import Game exposing (Game)
import Html exposing (Html)
import Html.Attributes
import Keyboard
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
    , game : Game
    , pressedKeys : List Keyboard.Key
    }


type Msg
    = NewFrame Time.Posix
    | Resizes Size
    | KeyMsg Keyboard.Msg


init : Flags -> ( Model, Cmd Msg )
init { time, size } =
    ( { size = size
      , frameSize = size
      , frameTime = Time.millisToPosix time
      , game = Game.init (Time.millisToPosix time)
      , pressedKeys = []
      }
    , Cmd.none
    )


subscriptions : Model -> Sub Msg
subscriptions _ =
    Sub.batch
        [ Browser.Events.onAnimationFrame NewFrame
        , Ports.resizes Resizes
        , Sub.map KeyMsg Keyboard.subscriptions
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
                , game = Game.update model.pressedKeys model.game
              }
            , Cmd.none
            )

        KeyMsg keyMsg ->
            ( { model | pressedKeys = Keyboard.update keyMsg model.pressedKeys }
            , Cmd.none
            )



-- VIEW ####################################################


view : Model -> Html Msg
view { frameSize, frameTime, game } =
    Html.div
        [ Html.Attributes.style "display" "flex"
        , Html.Attributes.style "flex-direction" "column"
        , Html.Attributes.style "height" "100%"
        ]
        [ viewGameScore game.score game.startTime frameTime
        , viewGameField frameSize game
        ]


viewGameScore : ( Int, Int ) -> Time.Posix -> Time.Posix -> Html Msg
viewGameScore ( score1, score2 ) startTime frameTime =
    let
        durationInMillis =
            Time.posixToMillis frameTime - Time.posixToMillis startTime

        durationInSeconds =
            durationInMillis // 1000
    in
    Html.p [ Html.Attributes.style "height" "50px" ]
        [ Html.text <|
            String.concat
                [ String.fromInt score1
                , " --- "
                , String.fromInt durationInSeconds
                , " --- "
                , String.fromInt score1
                ]
        ]


viewGameField : Size -> Game -> Html Msg
viewGameField frameSize game =
    let
        players =
            Game.players game
                |> List.map Views.Svg.Player.view

        allSvgItems =
            Views.Svg.Field.background :: players
    in
    Views.Svg.Field.view allSvgItems
