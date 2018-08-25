module Controller.Keyboard
    exposing
        ( Key
        , getThrustingAndDirection
        , shootIsPushed
        )

import Keyboard
import Keyboard.Arrows as Arrows


type alias Key =
    Keyboard.Key


shootIsPushed : List Key -> Bool
shootIsPushed keys =
    List.member Keyboard.Spacebar keys


getThrustingAndDirection : List Key -> Float -> ( Bool, Float )
getThrustingAndDirection keys previousDirection =
    let
        arrowsDirection =
            Arrows.arrowsDirection keys
    in
    ( arrowsDirection /= Arrows.NoDirection
    , fromArrows arrowsDirection previousDirection
    )


fromArrows : Arrows.Direction -> Float -> Float
fromArrows arrowsDirection previousDirection =
    case arrowsDirection of
        Arrows.North ->
            north

        Arrows.NorthEast ->
            northEast

        Arrows.East ->
            east

        Arrows.SouthEast ->
            southEast

        Arrows.South ->
            south

        Arrows.SouthWest ->
            southWest

        Arrows.West ->
            west

        Arrows.NorthWest ->
            northWest

        _ ->
            previousDirection


north : Float
north =
    -pi / 2


northEast : Float
northEast =
    -pi / 4


east : Float
east =
    0


southEast : Float
southEast =
    pi / 4


south : Float
south =
    pi / 2


southWest : Float
southWest =
    3 * pi / 4


west : Float
west =
    pi


northWest : Float
northWest =
    -3 * pi / 4
