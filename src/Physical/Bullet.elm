module Physical.Bullet exposing
    ( Bullet
    , Size(..)
    , bigSize
    , mediumSize
    , move
    , new
    , radiusAndSpeed
    , smallSize
    )


type alias Bullet =
    { size : Size
    , direction : Float
    , pos : ( Float, Float )
    }


type Size
    = Small
    | Medium
    | Big


radiusAndSpeed : Bullet -> ( Float, Float, Float )
radiusAndSpeed bullet =
    case bullet.size of
        Small ->
            ( smallSize, smallSpeed * cos bullet.direction, smallSpeed * sin bullet.direction )

        Medium ->
            ( mediumSize, mediumSpeed * cos bullet.direction, mediumSpeed * sin bullet.direction )

        Big ->
            ( bigSize, bigSpeed * cos bullet.direction, bigSpeed * sin bullet.direction )


new : Size -> Float -> ( Float, Float ) -> Bullet
new =
    Bullet


move : Int -> Bullet -> Bullet
move duration bullet =
    case bullet.size of
        Small ->
            moveAtSpeed smallSpeed duration bullet

        Medium ->
            moveAtSpeed mediumSpeed duration bullet

        Big ->
            moveAtSpeed bigSpeed duration bullet


moveAtSpeed : Float -> Int -> Bullet -> Bullet
moveAtSpeed speed duration ({ pos, direction } as bullet) =
    let
        newPos =
            ( Tuple.first pos + speed * toFloat duration * cos direction
            , Tuple.second pos + speed * toFloat duration * sin direction
            )
    in
    { bullet | pos = newPos }



-- CONSTANTS


smallSpeed : Float
smallSpeed =
    2.2


mediumSpeed : Float
mediumSpeed =
    1.8


bigSpeed : Float
bigSpeed =
    1.4


smallSize : Float
smallSize =
    20


mediumSize : Float
mediumSize =
    40


bigSize : Float
bigSize =
    60
