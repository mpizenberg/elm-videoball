module Data.Combination exposing (pairs)


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


reversePrepend : List a -> List a -> List a
reversePrepend list1 list2 =
    case list1 of
        [] ->
            list2

        l :: ls ->
            reversePrepend ls (l :: list2)
