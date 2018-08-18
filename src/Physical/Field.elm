module Physical.Field exposing (..)


width : Float
width =
    200


height : Float
height =
    100


playerPadding : Float
playerPadding =
    20


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
