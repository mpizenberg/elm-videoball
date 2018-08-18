module Views.Svg.Bullet exposing (..)

import Physical.Bullet as Bullet exposing (Bullet)
import Svg exposing (Svg)
import Svg.Attributes


view : Bullet -> Svg Never
view bullet =
    case bullet.size of
        Bullet.Small ->
            viewTriangle 4 bullet.direction bullet.pos

        Bullet.Medium ->
            viewTriangle 6 bullet.direction bullet.pos

        Bullet.Big ->
            viewTriangle 8 bullet.direction bullet.pos


viewTriangle : Float -> Float -> ( Float, Float ) -> Svg Never
viewTriangle size direction ( x, y ) =
    let
        dirB =
            direction + 2 * pi / 3

        dirC =
            direction - 2 * pi / 3

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
                , String.fromFloat xC
                , ","
                , String.fromFloat yC
                ]
    in
    Svg.polygon [ Svg.Attributes.points points ] []
