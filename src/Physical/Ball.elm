module Physical.Ball exposing (..)

import Time


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
