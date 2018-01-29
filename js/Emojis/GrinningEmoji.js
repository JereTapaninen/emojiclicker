define(["Emojis/Emoji"], function(Emoji) {
  return class GrinningEmoji extends Emoji {
    constructor() {
      super();

      this.image = "./content/grinning.svg";
      this.prob = window.globals.grinningProb;
    }

    click(caller, ev) {
      caller.addPoints(caller.clickPoints);

      if (window.getRandom(0, 100) < window.globals.doubleClickChance) {
        this.click(caller, ev);
      }
    }
  }
});