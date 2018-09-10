module Data.Helper exposing
    ( Four
    , OneOfFour(..)
    )


type alias Four a =
    { one : a
    , two : a
    , three : a
    , four : a
    }


type OneOfFour
    = Un
    | Deux
    | Trois
    | Quatre
