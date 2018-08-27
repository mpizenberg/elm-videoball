module Main exposing (..)

import Browser
import Browser.Events
import Data.Game as Game exposing (Game)
import Data.Helper exposing (Four)
import Gamepad exposing (Gamepad)
import Html exposing (Html)
import Html.Attributes
import Physical.Player as Player
import Ports
import Time
import Views.Svg.Game


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
    , playerControls : Four Player.Control
    }


type Msg
    = Resizes Size
    | NewGamepadFrame Gamepad.Blob


init : Flags -> ( Model, Cmd Msg )
init { time, size } =
    let
        gamepadTime =
            0
    in
    ( { size = size
      , frameSize = size
      , frameTime = Time.millisToPosix gamepadTime
      , game = Game.init (Time.millisToPosix gamepadTime)
      , playerControls =
            { one = Player.Control Nothing False
            , two = Player.Control Nothing False
            , three = Player.Control Nothing False
            , four = Player.Control Nothing False
            }
      }
    , Cmd.none
    )


subscriptions : Model -> Sub Msg
subscriptions _ =
    Sub.batch
        [ Ports.resizes Resizes
        , Ports.gamepad NewGamepadFrame
        ]


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        Resizes size ->
            ( { model | size = size }, Cmd.none )

        NewGamepadFrame blob ->
            let
                newFrameTime =
                    Gamepad.animationFrameTimestamp blob

                duration =
                    Time.posixToMillis newFrameTime - Time.posixToMillis model.frameTime

                gamepads =
                    Gamepad.getGamepads Gamepad.emptyUserMappings blob

                newPlayerControls =
                    List.foldl gamepadToPlayerControlAcc model.playerControls gamepads
            in
            ( { model
                | frameSize = model.size
                , frameTime = newFrameTime
                , playerControls = newPlayerControls
                , game = Game.update newFrameTime duration newPlayerControls model.game
              }
            , Cmd.none
            )


gamepadToPlayerControlAcc : Gamepad -> Four Player.Control -> Four Player.Control
gamepadToPlayerControlAcc gamepad controls =
    case Gamepad.getIndex gamepad of
        1 ->
            { controls | one = gamepadToPlayerControl gamepad }

        2 ->
            { controls | two = gamepadToPlayerControl gamepad }

        3 ->
            { controls | three = gamepadToPlayerControl gamepad }

        4 ->
            { controls | four = gamepadToPlayerControl gamepad }

        _ ->
            controls


gamepadToPlayerControl : Gamepad -> Player.Control
gamepadToPlayerControl gamepad =
    let
        stick =
            Gamepad.leftStickPosition gamepad

        thrusting =
            if stick.x == 0 && stick.y == 0 then
                Nothing

            else
                Just (atan2 -stick.y stick.x)
    in
    { holdingShot = Gamepad.isPressed gamepad Gamepad.A
    , thrusting = thrusting
    }



-- VIEW ####################################################


view : Model -> Html Msg
view { frameSize, frameTime, game } =
    Html.div
        [ Html.Attributes.style "display" "flex"
        , Html.Attributes.style "flex-direction" "column"
        , Html.Attributes.style "height" "100%"
        ]
        [ viewGameScore game.score game.startTime frameTime
        , Views.Svg.Game.viewGameField frameSize game
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
