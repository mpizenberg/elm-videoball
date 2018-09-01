module Processing.Collision
    exposing
        ( Kind(..)
        , bulletBallAll
        , bulletWallAll
        , playerPlayerAll
        )

import Data.Helper exposing (OneOfFour(..), OneOfThree(..))
import Physical.Ball as Ball exposing (Ball)
import Physical.Bullet as Bullet exposing (Bullet)
import Physical.Field as Field
import Physical.Player as Player exposing (Player)
import Time


type Kind
    = PlayerPlayer OneOfFour OneOfFour
    | PlayerWall OneOfFour Field.Wall
    | PlayerBullet OneOfFour ( OneOfFour, Int )
    | PlayerBall OneOfFour OneOfThree
      -- bullets
    | BulletBullet ( OneOfFour, Int ) ( OneOfFour, Int )
    | BulletWall ( OneOfFour, Int ) Field.Wall
    | BulletBall ( OneOfFour, Int ) OneOfThree
      -- balls
    | BallBall OneOfThree OneOfThree
    | BallWall OneOfThree Field.Wall



--


playerPlayerAll : Int -> Player -> Player -> Player -> Player -> List { time : Float, kind : Kind }
playerPlayerAll duration p1 p2 p3 p4 =
    -- no collision between players
    []



--


playerWallAll : Int -> Player -> Player -> Player -> Player -> List { time : Float, kind : Kind }
playerWallAll duration p1 p2 p3 p4 =
    -- Debug.todo "playerWallAll"
    []



--


playerBulletAll : Int -> Player -> Player -> Player -> Player -> List ( OneOfFour, Int, Bullet ) -> List { time : Float, kind : Kind }
playerBulletAll duration p1 p2 p3 p4 bullets =
    -- Debug.todo "playerBulletAll"
    []



--


playerBallAll : Int -> Player -> Player -> Player -> Player -> List ( OneOfThree, Ball ) -> List { time : Float, kind : Kind }
playerBallAll duration p1 p2 p3 p4 balls =
    -- Debug.todo "playerBallAll"
    []



--


bulletBulletAll : Int -> List ( OneOfFour, Int, Bullet ) -> List { time : Float, kind : Kind }
bulletBulletAll duration bullets =
    -- Debug.todo "bulletBulletAll"
    []



-- bullets with walls


bulletWallAll : Int -> List ( OneOfFour, Int, Bullet ) -> List { time : Float, kind : Kind }
bulletWallAll duration bullets =
    List.map (collideWithWalls duration) bullets
        |> List.foldl reverseAppend []


collideWithWalls : Int -> ( OneOfFour, Int, Bullet ) -> List { time : Float, kind : Kind }
collideWithWalls duration ( oneOfFour, id, bullet ) =
    let
        ( x, y ) =
            bullet.pos

        ( radius, vX, vY ) =
            Bullet.radiusAndSpeed bullet

        leftTime =
            timeOfCollideWithLeftWall radius x vX
                |> makeCollisionIfLowerThan duration (BulletWall ( oneOfFour, id ) Field.Left)

        rightTime =
            timeOfCollideWithRightWall radius x vX
                |> makeCollisionIfLowerThan duration (BulletWall ( oneOfFour, id ) Field.Right)

        topTime =
            timeOfCollideWithTopWall radius y vY
                |> makeCollisionIfLowerThan duration (BulletWall ( oneOfFour, id ) Field.Top)

        bottomTime =
            timeOfCollideWithBottomWall radius y vY
                |> makeCollisionIfLowerThan duration (BulletWall ( oneOfFour, id ) Field.Bottom)
    in
    [ leftTime, rightTime, topTime, bottomTime ]
        |> List.filterMap identity



-- bullets with balls


bulletBallAll : Int -> List ( OneOfFour, Int, Bullet ) -> List ( OneOfThree, Ball ) -> List { time : Float, kind : Kind }
bulletBallAll duration bullets balls =
    List.map (collideBallWithBullets duration bullets) balls
        |> List.foldl reverseAppend []


collideBallWithBullets : Int -> List ( OneOfFour, Int, Bullet ) -> ( OneOfThree, Ball ) -> List { time : Float, kind : Kind }
collideBallWithBullets duration bullets identifiedBall =
    List.filterMap (collideBallWithBullet duration identifiedBall) bullets


collideBallWithBullet : Int -> ( OneOfThree, Ball ) -> ( OneOfFour, Int, Bullet ) -> Maybe { time : Float, kind : Kind }
collideBallWithBullet duration ( oneOfThree, ball ) ( oneOfFour, id, bullet ) =
    let
        ( bulletRadius, bulletSpeedX, bulletSpeedY ) =
            Bullet.radiusAndSpeed bullet

        a =
            fromTo ball.speed ( bulletSpeedX, bulletSpeedY )

        b =
            fromTo ball.pos bullet.pos

        d =
            Ball.size + bulletRadius

        -- for t in [0,duration], solve | a * t + b | <= d
        aa =
            norm2 a

        bb =
            norm2 b

        ab =
            dot a b

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
            Just { time = max 0 t1, kind = BulletBall ( oneOfFour, id ) oneOfThree }

        else
            Nothing



--


ballBallAll : Int -> List ( OneOfThree, Ball ) -> List { time : Float, kind : Kind }
ballBallAll duration balls =
    -- Debug.todo "ballBallAll"
    []



--


ballWallAll : Int -> List ( OneOfThree, Ball ) -> List { time : Float, kind : Kind }
ballWallAll duration balls =
    -- Debug.todo "ballWallAll"
    []



--


type alias Pos =
    ( Float, Float )


norm2 : ( Float, Float ) -> Float
norm2 ( x, y ) =
    x * x + y * y


dot : ( Float, Float ) -> ( Float, Float ) -> Float
dot ( x1, y1 ) ( x2, y2 ) =
    x1 * x2 + y1 * y2


fromTo : Pos -> Pos -> ( Float, Float )
fromTo ( x1, y1 ) ( x2, y2 ) =
    ( x2 - x1, y2 - y1 )


makeCollisionIfLowerThan : Int -> Kind -> Float -> Maybe { time : Float, kind : Kind }
makeCollisionIfLowerThan duration kind collisionTime =
    if collisionTime >= 0 && collisionTime <= toFloat duration then
        Just { time = collisionTime, kind = kind }

    else
        Nothing


timeOfCollideWithLeftWall : Float -> Float -> Float -> Float
timeOfCollideWithLeftWall radius x vX =
    (radius - x) / vX


timeOfCollideWithRightWall : Float -> Float -> Float -> Float
timeOfCollideWithRightWall radius x vX =
    (Field.width - radius - x) / vX


timeOfCollideWithTopWall : Float -> Float -> Float -> Float
timeOfCollideWithTopWall radius y vY =
    (radius - y) / vY


timeOfCollideWithBottomWall : Float -> Float -> Float -> Float
timeOfCollideWithBottomWall radius y vY =
    (Field.height - radius - y) / vY


reverseAppend : List a -> List a -> List a
reverseAppend list1 list2 =
    case list1 of
        [] ->
            list2

        l :: ls ->
            reverseAppend ls (l :: list2)



-- ###################################################################


continuousCollision : ( Pos, Pos, Float ) -> ( Pos, Pos, Float ) -> Maybe Float
continuousCollision ( start1, end1, radius1 ) ( start2, end2, radius2 ) =
    let
        startVec =
            fromTo start1 start2

        endVec =
            fromTo end1 end2

        b =
            startVec

        a =
            fromTo startVec endVec

        d =
            radius1 + radius2

        -- for t in [0,1], solve | a * t + b | <= d
        aa =
            norm2 a

        bb =
            norm2 b

        ab =
            dot a b

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
        -- check that [t1,t2] intersects [0,1]
        if t2 >= 0 && t1 <= 1 then
            Just (max 0 t1)

        else
            Nothing



-- ###################################################################


type alias BBox =
    { left : Float
    , right : Float
    , top : Float
    , bottom : Float
    }


continousBBox : Float -> Pos -> Pos -> BBox
continousBBox radius ( x1, y1 ) ( x2, y2 ) =
    { left = min x1 x2 - radius
    , right = max x1 x2 + radius
    , top = min y1 y2 - radius
    , bottom = max y1 y2 + radius
    }


continousBoundedEntity : Int -> Float -> Pos -> Pos -> BoundedEntity
continousBoundedEntity id radius ( x1, y1 ) ( x2, y2 ) =
    { id = id
    , left = min x1 x2 - radius
    , right = max x1 x2 + radius
    , top = min y1 y2 - radius
    , bottom = max y1 y2 + radius
    }


type alias WithBBox a =
    { a
        | left : Float
        , right : Float
        , top : Float
        , bottom : Float
    }


intersects : WithBBox a -> WithBBox b -> Bool
intersects a b =
    (a.left <= b.right)
        && (b.left <= a.right)
        && (a.top <= b.bottom)
        && (b.top <= a.bottom)



-- ###################################################################


type alias BoundedEntity =
    { id : Int
    , left : Float
    , right : Float
    , top : Float
    , bottom : Float
    }


candidates : List BoundedEntity -> List ( Int, Int )
candidates entities =
    let
        lefts =
            List.sortBy .left entities

        rights =
            List.sortBy .right entities

        bothsID =
            mergeReverseSort compareLeftRight lefts rights

        ( _, candidatesAcc ) =
            List.foldl check ( [], [] ) bothsID
    in
    candidatesAcc


check : BoundedEntity -> ( List BoundedEntity, List ( Int, Int ) ) -> ( List BoundedEntity, List ( Int, Int ) )
check entity ( opensLeftRight, candidatesAcc ) =
    if member entity opensLeftRight then
        ( remove entity opensLeftRight, candidatesAcc )

    else
        let
            newCandidates =
                -- Debug.todo "newCandidates"
                []
        in
        ( entity :: opensLeftRight, newCandidates )


member : BoundedEntity -> List BoundedEntity -> Bool
member entity list =
    case list of
        [] ->
            False

        x :: xs ->
            entity.id == x.id || member entity xs


remove : BoundedEntity -> List BoundedEntity -> List BoundedEntity
remove =
    removeAccum []


removeAccum : List BoundedEntity -> BoundedEntity -> List BoundedEntity -> List BoundedEntity
removeAccum accum entity list =
    case list of
        [] ->
            accum

        x :: xs ->
            if entity.id == x.id then
                accum ++ xs

            else
                removeAccum (x :: accum) entity xs


mergeReverseSort : (a -> a -> Order) -> List a -> List a -> List a
mergeReverseSort =
    mergeReverseSortAccum []


mergeReverseSortAccum : List a -> (a -> a -> Order) -> List a -> List a -> List a
mergeReverseSortAccum accum compare left right =
    case ( left, right ) of
        ( [], [] ) ->
            accum

        ( [], r :: rs ) ->
            mergeReverseSortAccum (r :: accum) compare [] rs

        ( l :: ls, [] ) ->
            mergeReverseSortAccum (l :: accum) compare ls []

        ( l :: ls, r :: rs ) ->
            if compare l r == LT then
                mergeReverseSortAccum (l :: accum) compare ls right

            else
                mergeReverseSortAccum (r :: accum) compare left rs


compareLeftRight : BoundedEntity -> BoundedEntity -> Order
compareLeftRight left right =
    compare left.left right.right
