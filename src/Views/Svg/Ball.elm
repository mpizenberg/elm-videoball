module Views.Svg.Ball exposing (view)

import Physical.Ball as Ball exposing (Ball)
import Svg exposing (Svg)
import Svg.Attributes
import Views.Colors


view : Ball -> Svg msg
view { pos, speed, smash } =
    let
        ( x, y ) =
            pos

        strokeWidth =
            case smash of
                Just _ ->
                    "10"

                Nothing ->
                    "0"
    in
    Svg.circle
        [ Svg.Attributes.cx (String.fromFloat x)
        , Svg.Attributes.cy (String.fromFloat y)
        , Svg.Attributes.r (String.fromFloat Ball.size)
        , Svg.Attributes.fill Views.Colors.ball
        , Svg.Attributes.stroke Views.Colors.ballSmash
        , Svg.Attributes.strokeWidth strokeWidth
        ]
        []
