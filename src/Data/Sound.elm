module Data.Sound exposing (Sound(..), SoundEffect, handle, play)


type Sound
    = Bullet
    | Collision
    | Goal


type SoundEffect
    = PlaySound Sound


play : Sound -> SoundEffect
play =
    PlaySound


handle : (String -> Cmd msg) -> SoundEffect -> Cmd msg
handle p (PlaySound sound) =
    case sound of
        Bullet ->
            p "bullet"

        Collision ->
            p "collision"

        Goal ->
            p "goal"
