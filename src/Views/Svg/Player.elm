module Views.Svg.Player exposing (view)

import Physical.Player as Player exposing (Player, size)
import Svg exposing (Svg)
import Svg.Attributes
import Time


view : String -> Player -> Svg msg
view color { pos, direction, shootPrep, stunned, timeState } =
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
            Svg.polygon
                [ Svg.Attributes.points points
                , Svg.Attributes.fill color
                , Svg.Attributes.stroke "black"
                ]
                []

        -- stunn
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

        -- shoot
        ( shootOpacity, prepDuration ) =
            case shootPrep of
                Nothing ->
                    ( "0", 0 )

                Just prepTime ->
                    ( "0.5", Time.posixToMillis timeState - Time.posixToMillis prepTime )

        shootDiskSize =
            if prepDuration > Player.bigChargeTime then
                "40"

            else if prepDuration > Player.mediumChargeTime then
                "30"

            else
                "20"

        shootDisk =
            Svg.circle
                [ Svg.Attributes.cx (String.fromFloat xA)
                , Svg.Attributes.cy (String.fromFloat yA)
                , Svg.Attributes.r shootDiskSize
                , Svg.Attributes.fill "white"
                , Svg.Attributes.opacity shootOpacity
                ]
                []
    in
    Svg.g [] [ stunDisk, player, shootDisk ]
