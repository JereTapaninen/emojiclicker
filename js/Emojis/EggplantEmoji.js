define(["Emojis/KillableEmoji"], function(KillableEmoji) {
  return class EggplantEmoji extends KillableEmoji {
    constructor() {
      super(
          100
        );

      this.image = "./content/eggplant.svg";
      this.prob = window.globals.eggplantProb;
    }

    click(caller, ev) {
      this.damage(caller.clickPoints, caller, ev);
    }
  }
});