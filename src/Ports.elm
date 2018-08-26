port module Ports exposing (..)

import Gamepad


port resizes : ({ width : Float, height : Float } -> msg) -> Sub msg


port gamepad : (Gamepad.Blob -> msg) -> Sub msg
