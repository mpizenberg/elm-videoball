module Data.Vector exposing (add, diff, dot, fromTo, norm2, setNorm, times)


add : ( Float, Float ) -> ( Float, Float ) -> ( Float, Float )
add ( x1, y1 ) ( x2, y2 ) =
    ( x1 + x2, y1 + y2 )


diff : ( Float, Float ) -> ( Float, Float ) -> ( Float, Float )
diff ( x1, y1 ) ( x2, y2 ) =
    ( x1 - x2, y1 - y2 )


fromTo : ( Float, Float ) -> ( Float, Float ) -> ( Float, Float )
fromTo ( x1, y1 ) ( x2, y2 ) =
    ( x2 - x1, y2 - y1 )


times : Float -> ( Float, Float ) -> ( Float, Float )
times scalar ( x, y ) =
    ( scalar * x, scalar * y )


norm2 : ( Float, Float ) -> Float
norm2 ( x, y ) =
    x * x + y * y


dot : ( Float, Float ) -> ( Float, Float ) -> Float
dot ( x1, y1 ) ( x2, y2 ) =
    x1 * x2 + y1 * y2


setNorm : Float -> ( Float, Float ) -> ( Float, Float )
setNorm value vector =
    times (value / sqrt (norm2 vector)) vector
