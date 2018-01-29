define(["Emojis/Emoji"], function(Emoji) {
  return class JoyEmoji extends Emoji {
      constructor() {
      super();

      this.image = "./content/joy.svg";
      this.prob = window.globals.joyProb;
    }

    click(caller, ev) {
      caller.addPoints(caller.clickPoints * window.globals.joyClickMultiplier);
    }
  }
});