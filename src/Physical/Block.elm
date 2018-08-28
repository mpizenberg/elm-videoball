module Physical.Block
    exposing
        ( Block
        , init
        )

{-| Protecting blocks.
-}


{-| Is destroyed after third hit.
-}
type alias Block =
    { pos : ( Float, Float )
    , orientation : Float
    , hits : Int
    }


init : Float -> ( Float, Float ) -> Block
init orientation pos =
    { pos = pos
    , orientation = orientation
    , hits = 0
    }
