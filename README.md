# elm-videoball

A minimalist elm implementation of the game videoball.
You can play the game in your browser (currently only chrome) at
https://mpizenberg.github.io/elm-videoball/.

> This is not affiliated to the official game.
> If you like this game, you will very much like [the original one][videoball].

This game is done using the [elm language][elm].
We made it for the fun and to show that it is quite easy to make games in elm.
It uses [elm-gamepad][elm-gamepad] to handle game controllers through ports,
and [howler.js][howler] through ports for sounds.
The game is rendered in SVG.

Regarding the architecture,
objects that can have physical interactions with each other are
in modules inside the `Physical/` directory.
Other important data structures are in the `Data/` directory.
Visuals are under the `Views/Svg/` directory.

Have fun playing it!

[videoball]: http://videoball.net/
[elm]: http://elm-lang.org/
[elm-gamepad]: https://github.com/xarvh/elm-gamepad
[howler]: https://howlerjs.com/
