module Data.Helper exposing
    ( Four
    , OneOfFour(..)
    , OneOfThree(..)
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


type OneOfThree
    = One
    | Two
    | Three
