module Views.Svg.Field exposing
    ( background
    , view
    )

import Html exposing (Html)
import Html.Attributes
import Physical.Field as Field
import Svg exposing (Svg)
import Svg.Attributes


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
        , Svg.Attributes.fill "#f9ecfe"
        ]
        []


stringFieldWidth : String
stringFieldWidth =
    String.fromFloat Field.width


stringFieldHeight : String
stringFieldHeight =
    String.fromFloat Field.height
