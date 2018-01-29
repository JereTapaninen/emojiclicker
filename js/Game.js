/// GLOBAL VARIABLES
window.globals = {
  basePPS : 1,

  grinningProb : 10000,
  joyProb : 500,
  heartEyesProb : 0,
  thinkingProb: 0,
  eggplantProb: 0,

  doubleClickChance : 0,

  flipMultiplier : 1,
  autoclickMultiplier : 1,
  autoclickDoubleChance : 0,
  clickMultiplier : 1,
  joyClickMultiplier : 2
};

window.getRandom = function(min, max) {
  return Math.floor((Math.random() * max) + min);
}

window.getRandomDecimals = function(min, max) {
  return Math.random() * (max - min) + min;
}

requirejs(["jquery", "Emojis/GrinningEmoji", "Emojis/JoyEmoji", "Emojis/HeartEyesEmoji",
  "Emojis/EggplantEmoji", "Shop/Shop", "Misc/DisappearingText", "Emojis/KillableEmoji", "Misc/TextEval",
  "Shop/Items/UpgradableShopItem"], 
  function($, GrinningEmoji, JoyEmoji, HeartEyesEmoji, EggplantEmoji, Shop, DisappearingText, KillableEmoji, TextEval,
    UpgradableShopItem) {
  class Game {
    constructor() {
      this.shuffleWeighted();

      this.activeEmoji = this.emojis[0];

      this.points = 0;
      this.pps = 0;
      this.lastPPS = 0;

      this.clickPoints = 1;

      this.mousePosition = [ 0, 0 ];

      this.texts = [];
      this.gameObjects = [];
      this.visibleTexts = [];
    }

    start() {
      this.shop = new Shop();

      const me = this;

      this.shop.trees.forEach(t => {
        t.element.click(function() {
          if (t.items[t.currentItemIndex].bought || (typeof t.items[t.currentItemIndex].bought == "undefined" && t.items[t.currentItemIndex].atCap)) {
            console.log("[Game] Shop Tree has run out!");
            return;
          }

          if (t.items[t.currentItemIndex].cost <= me.points) {
            t.click(me);

            me.shuffleWeighted();
          }
        });
      });

      $(window).mousemove(function(ev) {
        this.mousePosition = [ ev.clientX, ev.clientY ];
      }.bind(this));

      $("#emoji").attr("src", this.activeEmoji.image);

      $("#emoji").hover(() => {
        $("#emoji").css({"width": "18vmax", "height": "18vmax"});
      }, () => {
        $("#emoji").css({"width": "16vmax", "height": "16vmax"});
      });

      $("#emoji").mousedown(() => {
        $("#emoji").css({"width": "17vmax", "height": "17vmax"});
      });

      $("#emoji").mouseup(() => {
        $("#emoji").css({"width": "18vmax", "height": "18vmax"});
      });

      //testing
      window.globals.degree = 0;

      $("#emoji").click((ev) => {
        this.activeEmoji.click(this, ev);

        if (this.activeEmoji instanceof KillableEmoji) {
          if (this.activeEmoji.isDead()) {
            this.activeEmoji.dispose();

            this.addPoints((this.activeEmoji.maxHealth * this.clickPoints) * 4);

            this.shuffleWeighted();

            this.updateEmoji();
          }
        } else {
          this.updateEmoji();
        }
      });

      this.update();
      this.updateSecond();

      console.log("%c[Game] Game loaded!", "color: rgb(0, 100, 0)");
      $("#loadingscreen").addClass("loadingscreenhidden");
    }

    shuffleWeighted() {
      this.emojis = [ new GrinningEmoji(), new JoyEmoji(), new HeartEyesEmoji(), new EggplantEmoji() ];

      this.weighted = [];

      this.emojis.forEach(em => {
        for (let i = 0; i < em.prob; i++) {
          this.weighted.push($.extend(true, Object.create(Object.getPrototypeOf(em)), em));
        }
      });

      console.log("%c[Game] Weighted emoji array created!", "color: rgb(0, 0, 150)");
    }

    updateEmoji() {
      //if (true) {
      //  this.activeEmoji = this.emojis[1];
      //}
      this.activeEmoji = this.weighted[window.getRandom(0, this.weighted.length)];
      this.activeEmoji.activate();

      $("#emoji").attr("src", this.activeEmoji.image);
    }

    /**
     * The main update method for the game
     * This gets called 60 times per second at max, or once every 16,67 ms. It depends on the performance.
     **/
    update() {
      for (let i = this.texts.length - 1; i >= 0; i--) {
        this.texts[i].update();

        if (this.texts[i].destroyMe) {
          this.texts[i].element.remove();
          this.texts.splice(i, 1);
        }
      }

      for (let i = this.visibleTexts.length - 1; i >= 0; i--) {
        if (this.visibleTexts[i].destroyMe) {
          this.visibleTexts[i].element.remove();
          this.visibleTexts.splice(i, 1);
        }
      }

      this.shop.trees.forEach(st => {
        if (typeof st.items != "undefined" && st.items.length > 0) {
          if ((typeof st.items[st.currentItemIndex].bought != "undefined" && st.items[st.currentItemIndex].bought) || st.items[st.currentItemIndex].cost > this.points
            || (st.items[st.currentItemIndex] instanceof UpgradableShopItem && st.items[st.currentItemIndex].atCap)) {
            $("#" + st.title).addClass("disabledtree");

            if ((typeof st.items[st.currentItemIndex].bought != "undefined" && st.items[st.currentItemIndex].bought)) {
              st.textSoldOut.show();
              st.textNotEnoughPoints.hide();
            } else if (st.items[st.currentItemIndex] instanceof UpgradableShopItem && st.items[st.currentItemIndex].atCap) {
              st.textSoldOut.show();
              st.textNotEnoughPoints.hide();
            } else if (st.items[st.currentItemIndex].cost > this.points) {
              st.textSoldOut.hide();
              st.textNotEnoughPoints.show();
            }
          } else {
            $("#" + st.title).removeClass("disabledtree");

            st.textSoldOut.hide();
            st.textNotEnoughPoints.hide();
          }
        }
      });

      $("#points").text(this.points.toFixed(2));
      $("#pps").text(this.pps.toFixed(2));
      $("#clickdamage").text(this.clickPoints.toFixed(2));

      this.clickPoints = window.globals.basePPS * window.globals.clickMultiplier;

      window.requestAnimationFrame(this.update.bind(this));
    }

    /**
     * This update occurs every second, and is not dependent on performance.
     * Used to spawn emojois, etc.
     **/
    updateSecond() {
      if (window.getRandomDecimals(0, 100) < window.globals.thinkingProb) {
        // spawn thonkening emojoi
        console.log("spawn!");
      }

      this.pps = this.lastPPS;
      this.lastPPS = 0;

      setTimeout(this.updateSecond.bind(this), 1000);
    }

    addPoints(p, autoclicker) {
      if (typeof autoclicker == "undefined" || autoclicker == false) {
        let _t = new DisappearingText("+" + p, this.mousePosition[0], this.mousePosition[1]);
        this.texts.push(_t);
      }

      this.lastPPS += p;

      this.points += p;

      window.globals.degree += p;

      if (window.globals.degree >= 360) {
        let remainder = Math.floor(window.globals.degree / 360);
        window.globals.degree -= 360 * remainder;

        let tempPoints = 100 * window.globals.flipMultiplier;

        // nice, emoji did a 360*!
        this.points += tempPoints;
        let tEval = new TextEval("You gain " + tempPoints.toFixed(2) + " points for a 360* flip!", "1.2vmax");
        let _posX = ($("#emoji").position().left + ($("#emoji").width() / 2)) - (tEval.width / 2);
        let _posY = ($("#emoji").position().top + ($("#emoji").height() / 2)) - (tEval.height / 2);
        tEval.dispose();
        let newDis = new DisappearingText("You gain " + tempPoints.toFixed(2) + " points for a 360* flip!", _posX, _posY, "1.2vmax", 150);
        this.texts.push(newDis);
      }

      $("#emoji").css("transform", "rotate(" + window.globals.degree + "deg)");
    }
  }

  window.game = new Game();

  $(() => {
    window.game.start();

    $(window).resize(function() {
      window.location.reload();
    });
  });
});