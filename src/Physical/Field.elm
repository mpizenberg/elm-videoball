module Physical.Field
    exposing
        ( Wall(..)
        , height
        , placePlayer1
        , placePlayer2
        , placePlayer3
        , placePlayer4
        , width
        )


type Wall
    = Left
    | Right
    | Top
    | Bottom


width : Float
width =
    3200


height : Float
height =
    1600


playerPadding : Float
playerPadding =
    400


placePlayer1 : ( Float, Float )
placePlayer1 =
    ( playerPadding, playerPadding )


placePlayer2 : ( Float, Float )
placePlayer2 =
    ( playerPadding, height - playerPadding )


placePlayer3 : ( Float, Float )
placePlayer3 =
    ( width - playerPadding, playerPadding )


placePlayer4 : ( Float, Float )
placePlayer4 =
    ( width - playerPadding, height - playerPadding )
