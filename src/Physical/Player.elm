module Physical.Player exposing
    ( Control
    , HasShot(..)
    , Player
    , bigChargeTime
    , checkWallObstacle
    , init
    , mediumChargeTime
    , moveDuring
    , moveUntil
    , prepareMovement
    , shotRecoil
    , size
    , stun
    , updateShot
    )

import Time


size : Float
size =
    -- radius
    40


maxSpeed : Float
maxSpeed =
    1.0


mediumChargeTime : Int
mediumChargeTime =
    1000


bigChargeTime : Int
bigChargeTime =
    2000


maxStunDuration : Int
maxStunDuration =
    2000


type alias Player =
    { pos : ( Float, Float )
    , speed : ( Float, Float )
    , direction : Float
    , thrusting : Bool
    , stunned : Maybe Time.Posix
    , shootPrep : Maybe Time.Posix
    , timeState : Time.Posix
    }


type alias Control =
    { thrusting : Maybe Float
    , holdingShot : Bool
    }


init : Time.Posix -> Float -> ( Float, Float ) -> Player
init frameTime direction pos =
    { pos = pos
    , speed = ( 0, 0 )
    , direction = direction
    , thrusting = False
    , stunned = Nothing
    , shootPrep = Nothing
    , timeState = frameTime
    }


stun : Player -> Player
stun player =
    { player | stunned = Just player.timeState, shootPrep = Nothing }


{-| Update thrusting, direction, speed and stunned such that
movement can later be computed by a simple linear movement.

  - frameTime: the time of the frame pre-movement.
  - duration: the inter-frame duration. Needed for acceleration "integration".

-}
prepareMovement : Int -> Bool -> Float -> Player -> Player
prepareMovement duration thrusting direction player =
    let
        viscosity =
            0.004 * toFloat duration

        viscosityCoef =
            max 0 (1 - viscosity)

        thrust =
            maxSpeed * viscosity

        ( oldVX, oldVY ) =
            player.speed

        stillStunned =
            case player.stunned of
                Just stunnedTime ->
                    Time.posixToMillis player.timeState - Time.posixToMillis stunnedTime < maxStunDuration

                Nothing ->
                    False

        stunned =
            if stillStunned then
                player.stunned

            else
                Nothing

        speed =
            if stillStunned || not thrusting then
                ( viscosityCoef * oldVX
                , viscosityCoef * oldVY
                )

            else
                ( viscosityCoef * oldVX + thrust * cos direction
                , viscosityCoef * oldVY + thrust * sin direction
                )
    in
    { player
        | thrusting = thrusting
        , direction = direction
        , speed = speed
        , stunned = stunned
    }


moveDuring : Float -> Player -> Player
moveDuring duration player =
    let
        time =
            (Time.posixToMillis player.timeState + floor duration)
                |> Time.millisToPosix
    in
    moveUntil time player


moveUntil : Time.Posix -> Player -> Player
moveUntil time player =
    let
        deltaTime =
            toFloat (Time.posixToMillis time - Time.posixToMillis player.timeState)

        ( vX, vY ) =
            player.speed

        pos =
            ( Tuple.first player.pos + vX * deltaTime
            , Tuple.second player.pos + vY * deltaTime
            )
    in
    { player | pos = pos, timeState = time }


checkWallObstacle : Float -> Float -> Float -> Float -> Player -> Player
checkWallObstacle left right top bottom player =
    let
        -- TODO optimize all that can be constants
        leftLimit =
            left + size

        rightLimit =
            right - size

        topLimit =
            top + size

        bottomLimit =
            bottom - size

        ( x, y ) =
            player.pos

        ( vX, vY ) =
            player.speed

        ( newX, newVX ) =
            -- with amortization
            if x < leftLimit then
                ( leftLimit + 0.5 * (leftLimit - x), -0.5 * vX )

            else if x > rightLimit then
                ( rightLimit - 0.5 * (x - rightLimit), -0.5 * vX )

            else
                ( x, vX )

        ( newY, newVY ) =
            -- with amortization
            if y < topLimit then
                ( topLimit + 0.5 * (topLimit - y), -0.5 * vY )

            else if y > bottomLimit then
                ( bottomLimit - 0.5 * (y - bottomLimit), -0.5 * vY )

            else
                ( y, vY )
    in
    { player | pos = ( newX, newY ), speed = ( newVX, newVY ) }



-- SHOTS


type HasShot
    = NoShot
    | ShotAfter Int


updateShot : Bool -> Player -> ( Player, HasShot )
updateShot spaceBarDown player =
    case ( player.stunned, spaceBarDown, player.shootPrep ) of
        ( Nothing, True, Nothing ) ->
            ( { player | shootPrep = Just player.timeState }, NoShot )

        ( Nothing, False, Just prepTime ) ->
            let
                duration =
                    Time.posixToMillis player.timeState - Time.posixToMillis prepTime
            in
            ( { player | shootPrep = Nothing }, ShotAfter duration )

        _ ->
            ( player, NoShot )


shotRecoil : Int -> Player -> Player
shotRecoil chargeDuration player =
    let
        ( vX, vY ) =
            player.speed

        recoilForce =
            if chargeDuration > bigChargeTime then
                1.2

            else if chargeDuration > mediumChargeTime then
                0.8

            else
                0.4

        newSpeed =
            ( vX - recoilForce * cos player.direction
            , vY - recoilForce * sin player.direction
            )
    in
    { player | speed = newSpeed }
