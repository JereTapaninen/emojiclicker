define(["Emojis/Emoji"], function(Emoji) {
  return class HeartEyesEmoji extends Emoji {
    constructor() {
      super();

      this.image = "./content/hearteyes.svg";
      this.prob = window.globals.heartEyesProb;
    }

    click(caller, ev) {
      this.tickCount = 0;

      this.customEvent(this, caller, ev);
    }
    
    customEvent(me, caller, ev) {
      caller.addPoints(caller.clickPoints);

      me.tickCount++;

      if (me.tickCount < 10)
        setTimeout(me.customEvent.bind(null, me, caller, ev), 250);
    }
  }
});