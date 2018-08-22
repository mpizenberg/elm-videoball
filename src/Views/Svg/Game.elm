module Views.Svg.Game exposing (..)

import Game exposing (Game)
import Html exposing (Html)
import Svg exposing (Svg)
import Views.Svg.Bullet
import Views.Svg.Field
import Views.Svg.Player


viewGameField : { width : Float, height : Float } -> Game -> Html msg
viewGameField frameSize game =
    let
        players =
            Game.players game
                |> List.map Views.Svg.Player.view
                |> Svg.g []

        bullets =
            [ game.bullets1, game.bullets2, game.bullets3, game.bullets4 ]
                |> List.map (List.map Views.Svg.Bullet.view)
                |> List.map (Svg.g [])
                |> Svg.g []
    in
    Views.Svg.Field.view
        [ Views.Svg.Field.background, bullets, players ]
