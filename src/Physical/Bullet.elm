module Physical.Bullet exposing (..)


type alias Bullet =
    { pos : ( Float, Float )
    , speed : ( Float, Float )
    , size : Size
    }


type Size
    = Small
    | Medium
    | Big


small : Float -> ( Float, Float ) -> Bullet
small direction pos =
    { pos = pos
    , speed = ( 4 * cos direction, 4 * sin direction )
    , size = Small
    }


medium : Float -> ( Float, Float ) -> Bullet
medium direction pos =
    { pos = pos
    , speed = ( 3 * cos direction, 3 * sin direction )
    , size = Medium
    }


big : Float -> ( Float, Float ) -> Bullet
big direction pos =
    { pos = pos
    , speed = ( 2 * cos direction, 2 * sin direction )
    , size = Big
    }
