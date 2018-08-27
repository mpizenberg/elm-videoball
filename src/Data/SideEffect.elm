module Data.SideEffect
    exposing
        ( SideEffect
        , combine
        , multiple
        , one
        )


type SideEffect a
    = One a
    | Multiple (List a)
    | Combination (SideEffect a) (SideEffect a)


one : a -> SideEffect a
one =
    One


multiple : List a -> SideEffect a
multiple =
    Multiple


combine : SideEffect a -> SideEffect a -> SideEffect a
combine =
    Combination
