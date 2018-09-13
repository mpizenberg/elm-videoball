;(function SoundManager() {
  const sounds = {
    bullet: new Howl({ src: ['assets/sounds/bullet.wav'] }),
    collision: new Howl({ src: ['assets/sounds/collision.wav'] }),
    goal: new Howl({ src: ['assets/sounds/goal.wav'] }),
  };

  window.SoundManager = function (name) {
    const sound = sounds[name];
    console.assert(sound != null, `Unknown sound: ${name}`);
    sound.play();
  };
}());
