module Views.Svg.Ball exposing (view)

import Physical.Ball as Ball exposing (Ball)
import Svg exposing (Svg)
import Svg.Attributes


view : Ball -> Svg msg
view { pos, speed, superspeed } =
    let
        ( x, y ) =
            pos
    in
    Svg.circle
        [ Svg.Attributes.cx (String.fromFloat x)
        , Svg.Attributes.cy (String.fromFloat y)
        , Svg.Attributes.r (String.fromFloat Ball.size)
        ]
        []
