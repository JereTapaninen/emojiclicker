define(["Shop/Trees/ShopTree", "Shop/Items/ShopItem", "Shop/Items/UpgradableShopItem", "Shop/Items/TemporaryShopItem"], function(ShopTree, ShopItem, UpgradableShopItem, TemporaryShopItem) {
  return class ShopTreeHeartEyes extends ShopTree {
    constructor() {
      super(
        "ShopTreeHeartEyes",
        "./content/hearteyes.svg"
      );

      this.items = [
        new ShopItem(
          this,
          "Heart Eyes 1",
          "Base chance of heart eyes increased from 0 to 5",
          250,
          function(caller) {
            window.globals.heartEyesProb = 5;
          }
          ),
        new ShopItem(
          this,
          "Heart Eyes 2",
          "Base chance of heart eyes increased from 5 to 10",
          750,
          function(caller) {
            window.globals.heartEyesProb = 10;
          }
          ),
        new ShopItem(
          this,
          "Heart Eyes 3",
          "Base chance of heart eyes increased from 10 to 25",
          2500,
          function(caller) {
            window.globals.heartEyesProb = 25;
          }
          ),
        new ShopItem(
          this,
          "Heart Eyes 4",
          "Base PPS multiplied by 2",
          5000,
          function(caller) {
            window.globals.basePPS *= 2;
          }
          ),
        new ShopItem(
          this,
          "Heart Eyes 5",
          "A 360* flip gives +10% additional points",
          10000,
          function(caller) {
            window.globals.flipMultiplier += 0.10;
          }
          ),
        new ShopItem(
          this,
          "Heart Eyes 6",
          "Base chance of heart eyes increased from 25 to 100",
          25000,
          function(caller) {
            window.globals.heartEyesProb = 100;
          }
          )
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