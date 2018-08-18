module Views.Svg.Field exposing (..)

import Html exposing (Html)
import Physical.Field as Field
import Svg exposing (Svg)
import Svg.Attributes


view : Float -> Float -> Html msg
view width height =
    Svg.svg
        [ viewBox
        , Svg.Attributes.width (String.fromFloat width)
        , Svg.Attributes.height (String.fromFloat height)
        ]
        []


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
        , Svg.Attributes.fill "pink"
        ]
        []


stringFieldWidth : String
stringFieldWidth =
    String.fromFloat Field.width


stringFieldHeight : String
stringFieldHeight =
    String.fromFloat Field.height
