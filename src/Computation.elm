module Computation exposing (..)


type alias Computation state result =
    state -> ( state, result )



-- RETRIEVE RESULTS ########################################


runFrom : state -> Computation state result -> ( state, result )
runFrom state computation =
    computation state



-- BUILD COMPUTATION #######################################


setState : state -> Computation state ()
setState state _ =
    ( state, () )


setResult : result -> Computation state result
setResult result state =
    ( state, result )



-- CHAIN COMPUTATIONS ######################################


mapResult : (a -> b) -> Computation state a -> Computation state b
mapResult f computation =
    Tuple.mapSecond f << computation


mapState : (state -> state) -> Computation state result -> Computation state result
mapState f computation =
    Tuple.mapFirst f << computation


andThen : (a -> Computation state b) -> Computation state a -> Computation state b
andThen followUp computation state =
    let
        ( newState, a ) =
            computation state
    in
    runFrom newState (followUp a)
