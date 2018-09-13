module Main exposing (main)

import Browser
import Controller.Gamepad as Gamepad exposing (Gamepad)
import Data.Game as Game exposing (Game)
import Data.Helper exposing (Four)
import Data.Sound as Sound exposing (Sound)
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


type alias Model =
    { size : Size
    , frameSize : Size
    , frameTime : Time.Posix
    , game : Game
    , playerControls : Four Player.Control
    }


type alias Size =
    { width : Float
    , height : Float
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
                    Gamepad.getGamepads blob

                newPlayerControls =
                    Gamepad.updatePlayerControls gamepads model.playerControls

                ( game, soundEffects ) =
                    Game.update newFrameTime duration newPlayerControls model.game
            in
            ( { model
                | frameSize = model.size
                , frameTime = newFrameTime
                , playerControls = newPlayerControls
                , game = game
              }
            , Cmd.batch <| List.map (Sound.handle Ports.sounds) soundEffects
            )



-- VIEW ####################################################


view : Model -> Html Msg
view { frameSize, frameTime, game } =
    Html.div
        [ Html.Attributes.style "display" "flex"
        , Html.Attributes.style "flex-direction" "column"
        , Html.Attributes.style "height" "100%"
        ]
        [ Views.Svg.Game.viewScoreboard game.score game.startTime frameTime
        , Views.Svg.Game.viewField frameSize game
        ]
