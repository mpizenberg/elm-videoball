module Views.Svg.Player exposing (view)

import Physical.Player as Player exposing (Player, size)
import Svg exposing (Svg)
import Svg.Attributes


view : Player -> Svg msg
view { pos, direction, shootPrep, stunned } =
    let
        dirB =
            direction + 2 * pi / 3

        dirC =
            direction - 2 * pi / 3

        ( x, y ) =
            pos

        ( xA, yA ) =
            ( x + size * cos direction, y + size * sin direction )

        ( xB, yB ) =
            ( x + size * cos dirB, y + size * sin dirB )

        ( xC, yC ) =
            ( x + size * cos dirC, y + size * sin dirC )

        points =
            String.concat
                [ String.fromFloat xA
                , ","
                , String.fromFloat yA
                , " "
                , String.fromFloat xB
                , ","
                , String.fromFloat yB
                , " "
                , String.fromFloat x
                , ","
                , String.fromFloat y
                , " "
                , String.fromFloat xC
                , ","
                , String.fromFloat yC
                ]

        player =
            Svg.polygon [ Svg.Attributes.points points ] []

        stunOpacity =
            case stunned of
                Nothing ->
                    "0"

                Just _ ->
                    "0.5"

        stunDisk =
            Svg.circle
                [ Svg.Attributes.cx (String.fromFloat x)
                , Svg.Attributes.cy (String.fromFloat y)
                , Svg.Attributes.r (String.fromFloat size)
                , Svg.Attributes.fill "gray"
                , Svg.Attributes.opacity stunOpacity
                ]
                []
    in
    Svg.g [] [ stunDisk, player ]
