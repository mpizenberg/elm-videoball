module Physical.Ball
    exposing
        ( Ball
        , init
        , size
        , squareDistanceFrom
        )

import Time


size : Float
size =
    80


type alias Ball =
    { pos : ( Float, Float )
    , speed : ( Float, Float )
    , superspeed : Maybe Time.Posix
    }


init : Ball
init =
    { pos = ( 0, 0 )
    , speed = ( 0, 0 )
    , superspeed = Nothing
    }


squareDistanceFrom : ( Float, Float ) -> Ball -> Float
squareDistanceFrom ( x, y ) { pos } =
    let
        dx =
            Tuple.first pos - x

        dy =
            Tuple.second pos - y
    in
    dx * dx + dy * dy
