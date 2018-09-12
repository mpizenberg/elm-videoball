module Physical.Ball exposing
    ( Ball
    , init
    , moveDuring
    , moveUntil
    , prepareMovement
    , size
    , squareDistanceFrom
    )

import Physical.Field as Field
import Time


size : Float
size =
    60


type alias Ball =
    { pos : ( Float, Float )
    , speed : ( Float, Float )
    , superspeed : Maybe Time.Posix
    , timeState : Time.Posix
    }


init : Time.Posix -> Ball
init frameTime =
    { pos = Field.center
    , speed = ( 0, 0 )
    , superspeed = Nothing
    , timeState = frameTime
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


prepareMovement : Float -> Ball -> Ball
prepareMovement duration ball =
    let
        viscosityCoef =
            max 0 (1 - 0.0015 * duration)

        newSpeed =
            ( viscosityCoef * Tuple.first ball.speed
            , viscosityCoef * Tuple.second ball.speed
            )
    in
    { ball | speed = newSpeed }


moveDuring : Float -> Ball -> Ball
moveDuring duration ball =
    let
        time =
            (Time.posixToMillis ball.timeState + floor duration)
                |> Time.millisToPosix
    in
    moveUntil time ball


moveUntil : Time.Posix -> Ball -> Ball
moveUntil time ball =
    let
        duration =
            Time.posixToMillis time - Time.posixToMillis ball.timeState

        newPos =
            ( Tuple.first ball.pos + toFloat duration * Tuple.first ball.speed
            , Tuple.second ball.pos + toFloat duration * Tuple.second ball.speed
            )
    in
    { ball | pos = newPos, timeState = time }
        |> bounceOnWalls


{-| Bounce on top and bottom walls.
Ignore left and right walls since they are victory walls.
-}
bounceOnWalls : Ball -> Ball
bounceOnWalls ball =
    let
        ( x, y ) =
            ball.pos

        ( vX, vY ) =
            ball.speed

        ( newY, newVY ) =
            if y < size then
                ( size + bounceCoef * (size - y)
                , bounceCoef * max -vY vY
                )

            else if y > Field.height - size then
                let
                    limit =
                        Field.height - size
                in
                ( limit - bounceCoef * (y - limit)
                , bounceCoef * min -vY vY
                )

            else
                ( y, vY )
    in
    { ball | pos = ( x, newY ), speed = ( vX, newVY ) }


bounceCoef : Float
bounceCoef =
    1.0
