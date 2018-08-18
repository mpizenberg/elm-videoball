module Physical.Bullet exposing (..)


type alias Bullet =
    { pos : ( Float, Float )
    , direction : Float
    , speed : Float
    , size : Size
    }


type Size
    = Small
    | Medium
    | Big


small : Float -> ( Float, Float ) -> Bullet
small direction pos =
    { pos = pos
    , direction = direction
    , speed = 4
    , size = Small
    }


medium : Float -> ( Float, Float ) -> Bullet
medium direction pos =
    { pos = pos
    , direction = direction
    , speed = 3
    , size = Medium
    }


big : Float -> ( Float, Float ) -> Bullet
big direction pos =
    { pos = pos
    , direction = direction
    , speed = 2
    , size = Big
    }
