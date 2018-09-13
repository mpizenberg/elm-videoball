module Views.Svg.Field exposing
    ( background
    , ballSpawnTimer
    , leftGoal
    , rightGoal
    , view
    )

import Html exposing (Html)
import Html.Attributes
import Physical.Ball as Ball
import Physical.Field as Field
import Svg exposing (Svg)
import Svg.Attributes
import Views.Colors


view : List (Svg msg) -> Html msg
view =
    Svg.svg [ viewBox ]


viewBox : Html.Attribute msg
viewBox =
    Svg.Attributes.viewBox <|
        String.join " "
            [ "0 0", stringFieldWidth, stringFieldHeight ]


background : Svg msg
background =
    Svg.rect
        [ Svg.Attributes.x "0"
        , Svg.Attributes.y "0"
        , Svg.Attributes.width stringFieldWidth
        , Svg.Attributes.height stringFieldHeight
        , Svg.Attributes.fill Views.Colors.fieldBackground
        ]
        []


leftGoal : Svg msg
leftGoal =
    Svg.rect
        [ Svg.Attributes.x "0"
        , Svg.Attributes.y "0"
        , Svg.Attributes.width leftGoalLimit
        , Svg.Attributes.height stringFieldHeight
        , Svg.Attributes.fill Views.Colors.netA
        ]
        []


rightGoal : Svg msg
rightGoal =
    Svg.rect
        [ Svg.Attributes.x rightGoalLimit
        , Svg.Attributes.y "0"
        , Svg.Attributes.width leftGoalLimit
        , Svg.Attributes.height stringFieldHeight
        , Svg.Attributes.fill Views.Colors.netB
        ]
        []


leftGoalLimit : String
leftGoalLimit =
    String.fromFloat (2 * Ball.size)


rightGoalLimit : String
rightGoalLimit =
    String.fromFloat (Field.width - 2 * Ball.size)


stringFieldWidth : String
stringFieldWidth =
    String.fromFloat Field.width


stringFieldHeight : String
stringFieldHeight =
    String.fromFloat Field.height


ballSpawnTimer : Float -> Svg msg
ballSpawnTimer ratio =
    let
        ( centerX, centerY ) =
            Field.center

        startX =
            centerX + Ball.size

        startY =
            centerY

        endX =
            centerX + Ball.size * cos (ratio * 2.0 * pi)

        endY =
            centerY + Ball.size * sin (ratio * 2.0 * pi)

        rotationAngle =
            360.0 * ratio

        ( largeArcFlag, sweepFlag ) =
            if rotationAngle <= 180.0 then
                ( "0", "1" )

            else
                ( "1", "1" )

        stringPath =
            String.join " "
                [ "M"
                , String.fromFloat centerX
                , String.fromFloat centerY
                , "L"
                , String.fromFloat startX
                , String.fromFloat startY
                , "A"
                , String.fromFloat Ball.size
                , String.fromFloat Ball.size
                , String.fromFloat rotationAngle
                , largeArcFlag
                , sweepFlag
                , String.fromFloat endX
                , String.fromFloat endY
                ]
    in
    Svg.path
        [ Svg.Attributes.d stringPath
        , Svg.Attributes.fill Views.Colors.ball
        , Svg.Attributes.opacity "0.5"
        ]
        []
