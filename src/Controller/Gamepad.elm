module Controller.Gamepad exposing
    ( Blob
    , Gamepad
    , animationFrameTimestamp
    , getGamepads
    , updatePlayerControls
    )

import Data.Helper exposing (Four)
import Gamepad
import Physical.Player as Player
import Time



-- Re-exports


type alias Gamepad =
    Gamepad.Gamepad


type alias Blob =
    Gamepad.Blob


animationFrameTimestamp : Blob -> Time.Posix
animationFrameTimestamp =
    Gamepad.animationFrameTimestamp


getGamepads : Blob -> List Gamepad
getGamepads =
    Gamepad.getGamepads Gamepad.emptyUserMappings



-- Player controls


updatePlayerControls : List Gamepad -> Four Player.Control -> Four Player.Control
updatePlayerControls gamepads controls =
    List.foldl toPlayerControlAcc controls gamepads


toPlayerControlAcc : Gamepad -> Four Player.Control -> Four Player.Control
toPlayerControlAcc gamepad controls =
    case Gamepad.getIndex gamepad of
        1 ->
            { controls | one = toPlayerControl gamepad }

        2 ->
            { controls | two = toPlayerControl gamepad }

        3 ->
            { controls | three = toPlayerControl gamepad }

        4 ->
            { controls | four = toPlayerControl gamepad }

        _ ->
            controls


toPlayerControl : Gamepad -> Player.Control
toPlayerControl gamepad =
    let
        stick =
            Gamepad.leftStickPosition gamepad

        thrusting =
            if stick.x * stick.x + stick.y * stick.y < deadZone then
                Nothing

            else
                Just (atan2 -stick.y stick.x)
    in
    { holdingShot = Gamepad.isPressed gamepad Gamepad.A
    , thrusting = thrusting
    }


deadZone : Float
deadZone =
    0.01
