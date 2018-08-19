module Physical.Bullet exposing (..)


type alias Bullet =
    { pos : ( Float, Float )
    , direction : Float
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
    , size = Small
    }


medium : Float -> ( Float, Float ) -> Bullet
medium direction pos =
    { pos = pos
    , direction = direction
    , size = Medium
    }


big : Float -> ( Float, Float ) -> Bullet
big direction pos =
    { pos = pos
    , direction = direction
    , size = Big
    }


move : Int -> Bullet -> Bullet
move duration bullet =
    case bullet.size of
        Small ->
            moveSmall duration bullet

        Medium ->
            moveMedium duration bullet

        Big ->
            moveBig duration bullet


moveSmall : Int -> Bullet -> Bullet
moveSmall =
    moveAtSpeed 4


moveMedium : Int -> Bullet -> Bullet
moveMedium =
    moveAtSpeed 3


moveBig : Int -> Bullet -> Bullet
moveBig =
    moveAtSpeed 2


moveAtSpeed : Float -> Int -> Bullet -> Bullet
moveAtSpeed speed duration ({ pos, direction } as bullet) =
    let
        newPos =
            ( Tuple.first pos + speed * toFloat duration * cos direction
            , Tuple.second pos + speed * toFloat duration * sin direction
            )
    in
    { bullet | pos = newPos }
