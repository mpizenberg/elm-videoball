module Views.Svg.Bullet exposing (view)

import Data.Helper exposing (OneOfFour(..))
import Physical.Bullet as Bullet exposing (Bullet)
import Svg exposing (Svg)
import Svg.Attributes
import Views.Colors


view : { playerId : OneOfFour, bullet : Bullet } -> Svg msg
view { playerId, bullet } =
    let
        color =
            case playerId of
                Un ->
                    Views.Colors.bulletA

                Deux ->
                    Views.Colors.bulletA

                Trois ->
                    Views.Colors.bulletB

                Quatre ->
                    Views.Colors.bulletB
    in
    case bullet.size of
        Bullet.Small ->
            viewTriangle color Bullet.smallSize bullet.direction bullet.pos

        Bullet.Medium ->
            viewTriangle color Bullet.mediumSize bullet.direction bullet.pos

        Bullet.Big ->
            viewTriangle color Bullet.bigSize bullet.direction bullet.pos


viewTriangle : String -> Float -> Float -> ( Float, Float ) -> Svg msg
viewTriangle color size direction ( x, y ) =
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
    Svg.polygon
        [ Svg.Attributes.points points
        , Svg.Attributes.fill color
        ]
        []
