port module Ports exposing (..)


port resizes : ({ width : Float, height : Float } -> msg) -> Sub msg
