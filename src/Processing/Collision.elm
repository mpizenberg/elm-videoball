module Processing.Collision exposing
    ( Kind(..)
    , ballBallAll
    , ballWallAll
    , bulletBallAll
    , bulletBulletAll
    , bulletWallAll
    , playerBallAll
    , playerBulletAll
    , playerPlayerAll
    )

import Data.Helper exposing (OneOfFour(..))
import Data.ListExtra as ListExtra exposing (reversePrepend)
import Data.Vector as Vector
import Physical.Ball as Ball exposing (Ball)
import Physical.Bullet as Bullet exposing (Bullet)
import Physical.Field as Field
import Physical.Player as Player exposing (Player)
import Time


type Kind
    = PlayerPlayer OneOfFour OneOfFour
    | PlayerWall OneOfFour Field.Wall
    | PlayerBullet OneOfFour Int
    | PlayerBall OneOfFour Int
      -- bullets
    | BulletBullet Int Int
    | BulletWall Int Field.Wall
    | BulletBall Int Int
      -- balls
    | BallBall Int Int
    | BallWall Int Field.Wall



-- players with players


playerPlayerAll : Int -> Player -> Player -> Player -> Player -> List { time : Float, kind : Kind }
playerPlayerAll duration p1 p2 p3 p4 =
    -- no collision between players
    []



-- players with walls


playerWallAll : Int -> Player -> Player -> Player -> Player -> List { time : Float, kind : Kind }
playerWallAll duration p1 p2 p3 p4 =
    -- Debug.todo "playerWallAll"
    []



-- players with bullets


playerBulletAll : Int -> Player -> Player -> Player -> Player -> List ( Int, Bullet ) -> List { time : Float, kind : Kind }
playerBulletAll duration p1 p2 p3 p4 bullets =
    collidePlayerWithAllBullets duration ( Un, p1 ) bullets
        |> reversePrepend (collidePlayerWithAllBullets duration ( Deux, p2 ) bullets)
        |> reversePrepend (collidePlayerWithAllBullets duration ( Trois, p3 ) bullets)
        |> reversePrepend (collidePlayerWithAllBullets duration ( Quatre, p4 ) bullets)


collidePlayerWithAllBullets : Int -> ( OneOfFour, Player ) -> List ( Int, Bullet ) -> List { time : Float, kind : Kind }
collidePlayerWithAllBullets duration identifiedPlayer bullets =
    List.filterMap (collidePlayerWithBullet duration identifiedPlayer) bullets


collidePlayerWithBullet : Int -> ( OneOfFour, Player ) -> ( Int, Bullet ) -> Maybe { time : Float, kind : Kind }
collidePlayerWithBullet duration ( oneOfFour, player ) ( bulletId, bullet ) =
    let
        ( bulletRadius, bulletSpeedX, bulletSpeedY ) =
            Bullet.radiusAndSpeed bullet

        a =
            Vector.fromTo player.speed ( bulletSpeedX, bulletSpeedY )

        b =
            Vector.fromTo player.pos bullet.pos

        d =
            Player.size + bulletRadius

        -- for t in [0,duration], solve | a * t + b | <= d
        aa =
            Vector.norm2 a

        bb =
            Vector.norm2 b

        ab =
            Vector.dot a b

        dd =
            d * d

        discriminant =
            ab * ab - aa * (bb - dd)
    in
    if discriminant < 0 then
        Nothing

    else
        let
            sqDiscriminant =
                sqrt discriminant

            t1 =
                (-ab - sqDiscriminant) / aa

            t2 =
                (-ab + sqDiscriminant) / aa
        in
        -- check that [t1,t2] intersects [0,duration]
        if t2 >= 0 && t1 <= toFloat duration then
            Just { time = max 0 t1, kind = PlayerBullet oneOfFour bulletId }

        else
            Nothing



-- players with balls


playerBallAll : Int -> Player -> Player -> Player -> Player -> List ( Int, Ball ) -> List { time : Float, kind : Kind }
playerBallAll duration p1 p2 p3 p4 balls =
    collidePlayerWithAllBalls duration ( Un, p1 ) balls
        |> reversePrepend (collidePlayerWithAllBalls duration ( Deux, p2 ) balls)
        |> reversePrepend (collidePlayerWithAllBalls duration ( Trois, p3 ) balls)
        |> reversePrepend (collidePlayerWithAllBalls duration ( Quatre, p4 ) balls)


collidePlayerWithAllBalls : Int -> ( OneOfFour, Player ) -> List ( Int, Ball ) -> List { time : Float, kind : Kind }
collidePlayerWithAllBalls duration identifiedPlayer balls =
    List.filterMap (collidePlayerWithBall duration identifiedPlayer) balls


collidePlayerWithBall : Int -> ( OneOfFour, Player ) -> ( Int, Ball ) -> Maybe { time : Float, kind : Kind }
collidePlayerWithBall duration ( oneOfFour, player ) ( ballId, ball ) =
    let
        a =
            Vector.fromTo player.speed ball.speed

        b =
            Vector.fromTo player.pos ball.pos

        d =
            Player.size + Ball.size

        -- for t in [0,duration], solve | a * t + b | <= d
        aa =
            Vector.norm2 a

        bb =
            Vector.norm2 b

        ab =
            Vector.dot a b

        dd =
            d * d

        discriminant =
            ab * ab - aa * (bb - dd)
    in
    if discriminant < 0 then
        Nothing

    else
        let
            sqDiscriminant =
                sqrt discriminant

            t1 =
                (-ab - sqDiscriminant) / aa

            t2 =
                (-ab + sqDiscriminant) / aa
        in
        -- check that [t1,t2] intersects [0,duration]
        if t2 >= 0 && t1 <= toFloat duration then
            Just { time = max 0 t1, kind = PlayerBall oneOfFour ballId }

        else
            Nothing



-- bullets with bullets


bulletBulletAll : Int -> List ( Int, Bullet ) -> List { time : Float, kind : Kind }
bulletBulletAll duration bullets =
    ListExtra.pairs bullets
        |> List.filterMap (\( b1, b2 ) -> collideBulletWithBullet duration b1 b2)


collideBulletWithBullet : Int -> ( Int, Bullet ) -> ( Int, Bullet ) -> Maybe { time : Float, kind : Kind }
collideBulletWithBullet duration ( id1, bullet1 ) ( id2, bullet2 ) =
    let
        ( radius1, speedX1, speedY1 ) =
            Bullet.radiusAndSpeed bullet1

        ( radius2, speedX2, speedY2 ) =
            Bullet.radiusAndSpeed bullet2

        a =
            Vector.fromTo ( speedX1, speedX2 ) ( speedX2, speedY2 )

        b =
            Vector.fromTo bullet1.pos bullet2.pos

        d =
            radius1 + radius2

        -- for t in [0,duration], solve | a * t + b | <= d
        aa =
            Vector.norm2 a

        bb =
            Vector.norm2 b

        ab =
            Vector.dot a b

        dd =
            d * d

        discriminant =
            ab * ab - aa * (bb - dd)
    in
    if discriminant < 0 then
        Nothing

    else
        let
            sqDiscriminant =
                sqrt discriminant

            t1 =
                (-ab - sqDiscriminant) / aa

            t2 =
                (-ab + sqDiscriminant) / aa
        in
        -- check that [t1,t2] intersects [0,duration]
        if t2 >= 0 && t1 <= toFloat duration then
            Just { time = max 0 t1, kind = BulletBullet id1 id2 }

        else
            Nothing



-- bullets with walls


bulletWallAll : Int -> List ( Int, Bullet ) -> List { time : Float, kind : Kind }
bulletWallAll duration bullets =
    List.map (collideWithWalls duration) bullets
        |> List.foldl reversePrepend []


collideWithWalls : Int -> ( Int, Bullet ) -> List { time : Float, kind : Kind }
collideWithWalls duration ( id, bullet ) =
    let
        ( x, y ) =
            bullet.pos

        ( radius, vX, vY ) =
            Bullet.radiusAndSpeed bullet

        leftTime =
            timeOfCollideWithLeftWall radius x vX
                |> makeCollisionIfLowerThan duration (BulletWall id Field.Left)

        rightTime =
            timeOfCollideWithRightWall radius x vX
                |> makeCollisionIfLowerThan duration (BulletWall id Field.Right)

        topTime =
            timeOfCollideWithTopWall radius y vY
                |> makeCollisionIfLowerThan duration (BulletWall id Field.Top)

        bottomTime =
            timeOfCollideWithBottomWall radius y vY
                |> makeCollisionIfLowerThan duration (BulletWall id Field.Bottom)
    in
    [ leftTime, rightTime, topTime, bottomTime ]
        |> List.filterMap identity



-- bullets with balls


bulletBallAll : Int -> List ( Int, Bullet ) -> List ( Int, Ball ) -> List { time : Float, kind : Kind }
bulletBallAll duration bullets balls =
    List.map (collideBallWithBullets duration bullets) balls
        |> List.foldl reversePrepend []


collideBallWithBullets : Int -> List ( Int, Bullet ) -> ( Int, Ball ) -> List { time : Float, kind : Kind }
collideBallWithBullets duration bullets identifiedBall =
    List.filterMap (collideBallWithBullet duration identifiedBall) bullets


collideBallWithBullet : Int -> ( Int, Ball ) -> ( Int, Bullet ) -> Maybe { time : Float, kind : Kind }
collideBallWithBullet duration ( ballId, ball ) ( id, bullet ) =
    let
        ( bulletRadius, bulletSpeedX, bulletSpeedY ) =
            Bullet.radiusAndSpeed bullet

        a =
            Vector.fromTo ball.speed ( bulletSpeedX, bulletSpeedY )

        b =
            Vector.fromTo ball.pos bullet.pos

        d =
            Ball.size + bulletRadius

        -- for t in [0,duration], solve | a * t + b | <= d
        aa =
            Vector.norm2 a

        bb =
            Vector.norm2 b

        ab =
            Vector.dot a b

        dd =
            d * d

        discriminant =
            ab * ab - aa * (bb - dd)
    in
    if discriminant < 0 then
        Nothing

    else
        let
            sqDiscriminant =
                sqrt discriminant

            t1 =
                (-ab - sqDiscriminant) / aa

            t2 =
                (-ab + sqDiscriminant) / aa
        in
        -- check that [t1,t2] intersects [0,duration]
        if t2 >= 0 && t1 <= toFloat duration then
            Just { time = max 0 t1, kind = BulletBall id ballId }

        else
            Nothing



-- balls with balls


ballBallAll : Int -> List ( Int, Ball ) -> List { time : Float, kind : Kind }
ballBallAll duration balls =
    case balls of
        b1 :: b2 :: [] ->
            collideBallWithBall duration b1 b2
                |> Maybe.map List.singleton
                |> Maybe.withDefault []

        b1 :: b2 :: b3 :: [] ->
            [ ( b1, b2 ), ( b1, b3 ), ( b2, b3 ) ]
                |> List.filterMap (\( b_1, b_2 ) -> collideBallWithBall duration b_1 b_2)

        _ ->
            []


collideBallWithBall : Int -> ( Int, Ball ) -> ( Int, Ball ) -> Maybe { time : Float, kind : Kind }
collideBallWithBall duration ( id1, ball1 ) ( id2, ball2 ) =
    let
        a =
            Vector.fromTo ball1.speed ball2.speed

        b =
            Vector.fromTo ball1.pos ball2.pos

        d =
            2 * Ball.size

        -- for t in [0,duration], solve | a * t + b | <= d
        aa =
            Vector.norm2 a

        bb =
            Vector.norm2 b

        ab =
            Vector.dot a b

        dd =
            d * d

        discriminant =
            ab * ab - aa * (bb - dd)
    in
    if discriminant < 0 then
        Nothing

    else
        let
            sqDiscriminant =
                sqrt discriminant

            t1 =
                (-ab - sqDiscriminant) / aa

            t2 =
                (-ab + sqDiscriminant) / aa
        in
        -- check that [t1,t2] intersects [0,duration]
        if t2 >= 0 && t1 <= toFloat duration then
            Just { time = max 0 t1, kind = BallBall id1 id2 }

        else
            Nothing



-- balls with walls


ballWallAll : Int -> List ( Int, Ball ) -> List { time : Float, kind : Kind }
ballWallAll duration balls =
    List.map (collideBallWithWalls duration) balls
        |> List.foldl reversePrepend []


collideBallWithWalls : Int -> ( Int, Ball ) -> List { time : Float, kind : Kind }
collideBallWithWalls duration ( id, ball ) =
    let
        ( x, y ) =
            ball.pos

        ( vX, vY ) =
            ball.speed

        leftTime =
            timeOfCollideWithLeftWall Ball.size x vX
                |> makeCollisionIfLowerThan duration (BallWall id Field.Left)

        rightTime =
            timeOfCollideWithRightWall Ball.size x vX
                |> makeCollisionIfLowerThan duration (BallWall id Field.Right)

        topTime =
            timeOfCollideWithTopWall Ball.size y vY
                |> makeCollisionIfLowerThan duration (BallWall id Field.Top)

        bottomTime =
            timeOfCollideWithBottomWall Ball.size y vY
                |> makeCollisionIfLowerThan duration (BallWall id Field.Bottom)
    in
    [ leftTime, rightTime, topTime, bottomTime ]
        |> List.filterMap identity



-- helper functions


makeCollisionIfLowerThan : Int -> Kind -> Float -> Maybe { time : Float, kind : Kind }
makeCollisionIfLowerThan duration kind collisionTime =
    if collisionTime >= 0 && collisionTime <= toFloat duration then
        Just { time = collisionTime, kind = kind }

    else
        Nothing


timeOfCollideWithLeftWall : Float -> Float -> Float -> Float
timeOfCollideWithLeftWall radius x vX =
    let
        negativeDistance =
            radius - x
    in
    if negativeDistance > 0 then
        0

    else
        negativeDistance / vX


timeOfCollideWithRightWall : Float -> Float -> Float -> Float
timeOfCollideWithRightWall radius x vX =
    let
        distance =
            Field.width - radius - x
    in
    if distance < 0 then
        0

    else
        distance / vX


timeOfCollideWithTopWall : Float -> Float -> Float -> Float
timeOfCollideWithTopWall radius y vY =
    let
        negativeDistance =
            radius - y
    in
    if negativeDistance > 0 then
        0

    else
        negativeDistance / vY


timeOfCollideWithBottomWall : Float -> Float -> Float -> Float
timeOfCollideWithBottomWall radius y vY =
    let
        distance =
            Field.height - radius - y
    in
    if distance < 0 then
        0

    else
        distance / vY
