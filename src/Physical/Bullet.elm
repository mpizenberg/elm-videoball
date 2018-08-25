module Physical.Bullet exposing (..)


type alias Bullet =
    { size : Size
    , direction : Float
    , pos : ( Float, Float )
    }


type Size
    = Small
    | Medium
    | Big


new : Size -> Float -> ( Float, Float ) -> Bullet
new =
    Bullet


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
    moveAtSpeed 2.2


moveMedium : Int -> Bullet -> Bullet
moveMedium =
    moveAtSpeed 1.8


moveBig : Int -> Bullet -> Bullet
moveBig =
    moveAtSpeed 1.4


moveAtSpeed : Float -> Int -> Bullet -> Bullet
moveAtSpeed speed duration ({ pos, direction } as bullet) =
    let
        newPos =
            ( Tuple.first pos + speed * toFloat duration * cos direction
            , Tuple.second pos + speed * toFloat duration * sin direction
            )
    in
    { bullet | pos = newPos }
