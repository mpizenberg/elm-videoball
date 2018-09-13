port module Ports exposing (gamepad, resizes, sounds)

import Gamepad


port resizes : ({ width : Float, height : Float } -> msg) -> Sub msg


port gamepad : (Gamepad.Blob -> msg) -> Sub msg


port sounds : String -> Cmd msg
