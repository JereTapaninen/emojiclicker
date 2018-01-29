define(["Emojis/Emoji", "Misc/DisappearingText"], function(Emoji, DisappearingText) {
  return class KillableEmoji extends Emoji {
    constructor(health) {
      super();

      this.dead = false;
      this.maxHealth = health;
      this.health = 100;
    }

    click(caller, ev) {
      throw new TypeError("Click-event not defined; base-class method called");
    }

    customEvent(me, caller, ev) {
      throw new TypeError("CustomEvent-event not defined; base-class method called");
    }

    damage(dmg, caller, ev) {
      this.health -= dmg;

      if (this.health < 0) {
        this.dead = true;
      }

      let newDis = new DisappearingText("-" + caller.clickPoints + " health!", caller.mousePosition[0], caller.mousePosition[1]);
      caller.texts.push(newDis);

      this.healthBarTop.css({"width": this.health * (250 / this.maxHealth) + "px"});
    }

    isDead() {
      return this.dead;
    }

    activate() {
      super.activate();

      this.healthBarBase = $("<div class=\"healthbarbase\"></div>");
      this.healthBarTop = $("<div class=\"healthbartop\"></div>");

      this.healthBarBase.css({"left": ($("#canvas").position().left + ($("#canvas").width() / 2)) - (250 / 2) + "px",
        "top": (325) + "px",
        "width": 250 + "px", "height": 30 + "px"});
      this.healthBarTop.css({"left": ($("#canvas").position().left + ($("#canvas").width() / 2)) - (250 / 2) + "px",
        "top": (325) + "px",
        "width": this.health * (250 / this.maxHealth) + "px", "height": 30 + "px"});

      $("body").append(this.healthBarBase);
      $("body").append(this.healthBarTop);
    }

    dispose() {
      this.healthBarBase.remove();
      this.healthBarTop.remove();
    }
  }
});