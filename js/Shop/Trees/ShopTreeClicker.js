define(["Shop/Trees/ShopTree", "Shop/Items/UpgradableShopItem", "Shop/Items/TemporaryShopItem", "Emojis/KillableEmoji"], function(ShopTree, UpgradableShopItem, TemporaryShopItem, KillableEmoji) {
  return class ShopTreeClicker extends ShopTree {
    constructor() {
      super(
        "ShopTreeClicker",
        "./content/click.svg"
        );

      this.items = [
        new UpgradableShopItem(
          this,
          "Autoclicker",
          "Clicks automatically for you every 1 second",
          100,
          1.05,
          -1,
          function(caller) {
            let effectFunction = function(me, caller) {
              if (caller.activeEmoji instanceof KillableEmoji) {
                caller.activeEmoji.damage(caller.clickPoints * window.globals.autoclickMultiplier, caller, undefined);

                if (caller.activeEmoji.isDead()) {
                  caller.activeEmoji.dispose();

                  caller.addPoints((caller.activeEmoji.maxHealth * caller.clickPoints) * 4);

                  caller.shuffleWeighted();

                  caller.updateEmoji();
                }
              } else {
                if (window.getRandom(0, 100) < window.globals.autoclickDoubleChance) {
                  caller.addPoints((caller.clickPoints * window.globals.autoclickMultiplier) * 2, true);

                  if (window.getRandom(0, 100) < window.globals.doubleClickChance) {
                    caller.addPoints((caller.clickPoints * window.globals.autoclickMultiplier) * 2, true);
                  }
                } else {
                  caller.addPoints(caller.clickPoints * window.globals.autoclickMultiplier, true);

                  if (window.getRandom(0, 100) < window.globals.doubleClickChance) {
                    caller.addPoints(caller.clickPoints * window.globals.autoclickMultiplier, true);
                  }
                }
              }

              if (caller.shop.trees[0].items[0].amount == 25 && !caller.shop.trees[0].items[1].bought) {
                caller.shop.trees[0].currentItemIndex = 1;
              }

              if (caller.shop.trees[0].items[0].amount == 50 && !caller.shop.trees[0].items[2].bought) {
                caller.shop.trees[0].currentItemIndex = 2;
              }

              setTimeout(me.bind(null, me, caller), 1000);
            };

            effectFunction(effectFunction, caller);
          }
          ),
        new TemporaryShopItem(
          this,
          "Click-o-mania",
          "Each autoclicker has +25% more PPS",
          1500,
          function(caller) {
            window.globals.autoclickMultiplier += 0.25;

            caller.shop.trees[0].currentItemIndex = 0;
          }
          ),
        new TemporaryShopItem(
          this,
          "Click Hell",
          "Each autoclicker has a +5% chance of double points. This also doubles double click points.",
          5000,
          function(caller) {
            window.globals.autoclickDoubleChance += 5;

            caller.shop.trees[0].currentItemIndex = 0;
          })
      ];

      super.reconfigurate();
    }

    click(caller) {
      super.click(caller);
    }

    update() {
      if (!(this.items[this.currentItemIndex] instanceof UpgradableShopItem) && !(this.items[this.currentItemIndex] instanceof TemporaryShopItem)) {
        if (this.currentItemIndex < this.items.length - 1) {
          this.currentItemIndex++;
        }
      }

      if (this.items[this.currentItemIndex] instanceof UpgradableShopItem) {
        $("#" + this.title + "counter").empty();
        $("#" + this.title + "counter").append("<h6>" + this.items[this.currentItemIndex].amount + "</h6>");
      }
      $("#" + this.title + "info").empty();
      $("#" + this.title + "info").append($("<p class=\"bold\">" + this.items[this.currentItemIndex].title + "</p><p id=\"" + this.title + "cost\">Cost: " + this.items[this.currentItemIndex].cost.toFixed(2) + "</p><p>" + this.items[this.currentItemIndex].description + "</p>"));
    }
  }
});