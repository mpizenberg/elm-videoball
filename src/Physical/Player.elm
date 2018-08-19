module Physical.Player exposing (..)

import Time


type alias Player =
    { pos : ( Float, Float )
    , speed : ( Float, Float )
    , direction : Float
    , thrusting : Bool
    , stunned : Maybe Time.Posix
    , shootPrep : Maybe Time.Posix
    }


type HasShot
    = NoShot
    | ShotAfter Int


type MayBlock
    = NoBlock
    | MayBlock Int


init : Float -> ( Float, Float ) -> Player
init direction pos =
    { pos = pos
    , speed = ( 0, 0 )
    , direction = direction
    , thrusting = False
    , stunned = Nothing
    , shootPrep = Nothing
    }


{-| The movement induced by a player moving in a certain direction
in normal conditions (not stunned).

If we set the thrust coef == viscosity coef then the max speed with
this viscosity model is 1.0.
Let's set that for efficiency and adapt the size of the field
such that max speed of 1.0 is reasonable.

-}
thrustMove : Int -> Float -> Player -> Player
thrustMove duration direction player =
    let
        thrustCoef =
            0.004 * toFloat duration

        viscosityCoef =
            max 0 (1 - thrustCoef)

        ( oldVX, oldVY ) =
            player.speed

        ( vX, vY ) =
            ( thrustCoef * cos direction + viscosityCoef * oldVX
            , thrustCoef * sin direction + viscosityCoef * oldVY
            )

        pos =
            ( Tuple.first player.pos + vX * toFloat duration
            , Tuple.second player.pos + vY * toFloat duration
            )
    in
    { player | pos = pos, speed = ( vX, vY ), direction = direction, thrusting = True }


freefallMove : Int -> Float -> Player -> Player
freefallMove duration direction player =
    let
        thrustCoef =
            0.004 * toFloat duration

        viscosityCoef =
            max 0 (1 - thrustCoef)

        ( oldVX, oldVY ) =
            player.speed

        ( vX, vY ) =
            ( viscosityCoef * oldVX
            , viscosityCoef * oldVY
            )

        pos =
            ( Tuple.first player.pos + vX * toFloat duration
            , Tuple.second player.pos + vY * toFloat duration
            )
    in
    { player | pos = pos, speed = ( vX, vY ), direction = direction, thrusting = False }


stun : Time.Posix -> Player -> ( Player, MayBlock )
stun time player =
    case ( player.stunned, player.shootPrep ) of
        ( Nothing, Just prepTime ) ->
            let
                duration =
                    Time.posixToMillis time - Time.posixToMillis prepTime
            in
            ( { player | stunned = Just time, shootPrep = Nothing, thrusting = False }
            , MayBlock duration
            )

        _ ->
            ( { player | stunned = Just time, thrusting = False }, NoBlock )


updateShot : Time.Posix -> Bool -> Player -> ( Player, HasShot )
updateShot frameTime spaceBarDown ({ shootPrep } as player) =
    case ( spaceBarDown, shootPrep ) of
        ( True, Nothing ) ->
            ( prepareShot frameTime player, NoShot )

        ( False, Just prepTime ) ->
            releaseShot frameTime player

        _ ->
            ( player, NoShot )


prepareShot : Time.Posix -> Player -> Player
prepareShot time player =
    case player.stunned of
        Just _ ->
            player

        _ ->
            { player | shootPrep = Just time }


releaseShot : Time.Posix -> Player -> ( Player, HasShot )
releaseShot time player =
    case ( player.stunned, player.shootPrep ) of
        ( Nothing, Just prepTime ) ->
            let
                duration =
                    Time.posixToMillis time - Time.posixToMillis prepTime
            in
            ( { player | shootPrep = Nothing }, ShotAfter duration )

        _ ->
            ( player, NoShot )
