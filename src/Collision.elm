module Collision exposing (..)

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


type OneOfFour
    = Un
    | Deux
    | Trois
    | Quatre


type OneOfThree
    = One
    | Two
    | Three



--


playerPlayerAll : Time.Posix -> Player -> Player -> Player -> Player -> List { time : Float, kind : Kind }
playerPlayerAll endTime p1 p2 p3 p4 =
    -- no collision between players
    []



--


playerWallAll : Time.Posix -> Player -> Player -> Player -> Player -> List { time : Float, kind : Kind }
playerWallAll endTime p1 p2 p3 p4 =
    Debug.todo "playerWallAll"



--


playerBulletAll : Time.Posix -> Player -> Player -> Player -> Player -> List ( OneOfFour, Int, Bullet ) -> List { time : Float, kind : Kind }
playerBulletAll endTime p1 p2 p3 p4 bullets =
    Debug.todo "playerBulletAll"



--


playerBallAll : Time.Posix -> Player -> Player -> Player -> Player -> List ( OneOfThree, Ball ) -> List { time : Float, kind : Kind }
playerBallAll endTime p1 p2 p3 p4 balls =
    Debug.todo "playerBallAll"



--


bulletBulletAll : Time.Posix -> List ( OneOfFour, Int, Bullet ) -> List { time : Float, kind : Kind }
bulletBulletAll endTime bullets =
    Debug.todo "bulletBulletAll"



-- bullets with walls


bulletWallAll : Time.Posix -> List ( OneOfFour, Int, Bullet ) -> List { time : Float, kind : Kind }
bulletWallAll endTime bullets =
    List.filterMap (collideWithWall endTime) bullets


collideWithWall : Time.Posix -> ( OneOfFour, Int, Bullet ) -> Maybe { time : Float, kind : Kind }
collideWithWall endTime ( oneOfFour, id, bullet ) =
    Nothing



--


bulletBallAll : Time.Posix -> List ( OneOfFour, Int, Bullet ) -> List ( OneOfThree, Ball ) -> List { time : Float, kind : Kind }
bulletBallAll endTime bullets balls =
    Debug.todo "bulletBallAll"



--


ballBallAll : Time.Posix -> List ( OneOfThree, Ball ) -> List { time : Float, kind : Kind }
ballBallAll endTime balls =
    Debug.todo "ballBallAll"



--


ballWallAll : Time.Posix -> List ( OneOfThree, Ball ) -> List { time : Float, kind : Kind }
ballWallAll endTime balls =
    Debug.todo "ballWallAll"



-- ###################################################################


type alias Pos =
    ( Float, Float )


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


norm2 : ( Float, Float ) -> Float
norm2 ( x, y ) =
    x * x + y * y


dot : ( Float, Float ) -> ( Float, Float ) -> Float
dot ( x1, y1 ) ( x2, y2 ) =
    x1 * x2 + y1 * y2


fromTo : Pos -> Pos -> ( Float, Float )
fromTo ( x1, y1 ) ( x2, y2 ) =
    ( x2 - x1, y2 - y1 )



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
                Debug.todo "newCandidates"
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
