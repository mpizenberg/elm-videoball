module Views.Svg.Game exposing (..)

import Data.Game as Game exposing (Game)
import Dict exposing (Dict)
import Html exposing (Html)
import Physical.Bullet exposing (Bullet)
import Svg exposing (Svg)
import Views.Svg.Bullet
import Views.Svg.Field
import Views.Svg.Player


viewGameField : { width : Float, height : Float } -> Game -> Html msg
viewGameField frameSize game =
    let
        players =
            Game.allPlayers game
                |> List.map Views.Svg.Player.view
                |> Svg.g []

        bullets =
            Game.allBullets game
                |> List.map bulletsDictToSvg
                |> Svg.g []
    in
    Views.Svg.Field.view
        [ Views.Svg.Field.background, bullets, players ]


bulletsDictToSvg : Dict Int Bullet -> Svg msg
bulletsDictToSvg =
    Dict.values
        >> List.map Views.Svg.Bullet.view
        >> Svg.g []
