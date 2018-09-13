module Views.Svg.Game exposing
    ( viewField
    , viewScoreboard
    )

import Data.Game as Game exposing (Game)
import Dict exposing (Dict)
import Html exposing (Html)
import Html.Attributes
import Physical.Bullet exposing (Bullet)
import Svg exposing (Svg)
import Time
import Views.Colors
import Views.Svg.Ball
import Views.Svg.Bullet
import Views.Svg.Field
import Views.Svg.Player


viewScoreboard : ( Int, Int ) -> Time.Posix -> Time.Posix -> Html msg
viewScoreboard ( score1, score2 ) startTime frameTime =
    let
        durationInMillis =
            Time.posixToMillis frameTime - Time.posixToMillis startTime

        durationInSeconds =
            durationInMillis // 1000
    in
    Html.div
        [ Html.Attributes.style "display" "flex"
        , Html.Attributes.style "justify-content" "center"
        , Html.Attributes.style "align-items" "center"
        ]
        [ viewScore score1 Views.Colors.netA
        , viewTime durationInSeconds
        , viewScore score2 Views.Colors.netB
        ]


viewScore : Int -> String -> Html msg
viewScore score color =
    Html.div
        [ Html.Attributes.style "text-align" "center"
        , Html.Attributes.style "width" "10rem"
        , Html.Attributes.style "font-size" "4rem"
        , Html.Attributes.style "color" color
        , Html.Attributes.style "border" "1rem solid"
        , Html.Attributes.style "border-color" color
        ]
        [ Html.text <|
            String.fromInt score
        ]


viewTime : Int -> Html msg
viewTime time =
    Html.div
        [ Html.Attributes.style "text-align" "center"
        , Html.Attributes.style "width" "10rem"
        , Html.Attributes.style "font-size" "4rem"
        , Html.Attributes.style "color" Views.Colors.textLight
        ]
        [ Html.text <|
            String.fromInt time
        ]


viewField : { width : Float, height : Float } -> Game -> Html msg
viewField frameSize game =
    let
        players =
            Svg.g []
                [ Views.Svg.Player.view Views.Colors.playerA game.player1
                , Views.Svg.Player.view Views.Colors.playerA game.player2
                , Views.Svg.Player.view Views.Colors.playerB game.player3
                , Views.Svg.Player.view Views.Colors.playerB game.player4
                ]

        bullets =
            game.bullets
                |> Dict.values
                |> List.map Views.Svg.Bullet.view
                |> Svg.g []

        balls =
            game.balls.inGame
                |> Dict.values
                |> List.map Views.Svg.Ball.view
                |> Svg.g []
    in
    Views.Svg.Field.view
        [ Views.Svg.Field.background
        , Views.Svg.Field.leftGoal
        , Views.Svg.Field.rightGoal
        , balls
        , bullets
        , players
        ]
