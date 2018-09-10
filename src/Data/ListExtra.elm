module Data.ListExtra exposing
    ( pairs
    , reversePrepend
    )

{-| Helper module for functions on lists.
-}


{-| Optimized concatenation of two lists.
It does not maintain order, the first list is reversed.
-}
reversePrepend : List a -> List a -> List a
reversePrepend list1 list2 =
    case list1 of
        [] ->
            list2

        l :: ls ->
            reversePrepend ls (l :: list2)


{-| Generate the list of all pairs.
-}
pairs : List a -> List ( a, a )
pairs list =
    pairsAccum list []


pairsAccum : List a -> List ( a, a ) -> List ( a, a )
pairsAccum list accum =
    case list of
        x :: xs ->
            pairsAccum xs (reversePrepend (pairWith x xs) accum)

        [] ->
            accum


pairWith : a -> List a -> List ( a, a )
pairWith x list =
    List.map (Tuple.pair x) list
