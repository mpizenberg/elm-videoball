module Views.Svg.Game exposing (..)

import Data.Game as Game exposing (Game)
import Dict exposing (Dict)
import Html exposing (Html)
import Html.Attributes
import Physical.Bullet exposing (Bullet)
import Svg exposing (Svg)
import Time
import Views.Svg.Bullet
import Views.Svg.Field
import Views.Svg.Player


viewScore : ( Int, Int ) -> Time.Posix -> Time.Posix -> Html msg
viewScore ( score1, score2 ) startTime frameTime =
    let
        durationInMillis =
            Time.posixToMillis frameTime - Time.posixToMillis startTime

        durationInSeconds =
            durationInMillis // 1000
    in
    Html.p [ Html.Attributes.style "height" "50px" ]
        [ Html.text <|
            String.concat
                [ String.fromInt score1
                , " --- "
                , String.fromInt durationInSeconds
                , " --- "
                , String.fromInt score1
                ]
        ]


viewField : { width : Float, height : Float } -> Game -> Html msg
viewField frameSize game =
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
