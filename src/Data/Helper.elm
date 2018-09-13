module Data.Helper exposing
    ( Four
    , OneOfFour(..)
    , timeDiff
    )

import Time


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


timeDiff : Time.Posix -> Time.Posix -> Int
timeDiff t1 t2 =
    Time.posixToMillis t2 - Time.posixToMillis t1
