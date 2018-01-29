define(["Shop/Trees/ShopTree", "Shop/Items/ShopItem", "Shop/Items/UpgradableShopItem", "Shop/Items/TemporaryShopItem"], function(ShopTree, ShopItem, UpgradableShopItem, TemporaryShopItem) {
  return class ShopTreeJoy extends ShopTree {
    constructor() {
      super(
        "ShopTreeJoy",
        "./content/joy.svg"
      );

      this.items = [
        new ShopItem(
          this,
          "Joy 1",
          "Click PPS increased by 10%",
          200,
          function(caller) {
            window.globals.clickMultiplier *= 1.10;
          }
          ),
        new ShopItem(
          this,
          "Joy 2",
          "+5% chance of a double click per click",
          400,
          function(caller) {
            window.globals.doubleClickChance += 5;
          }
          ),
        new ShopItem(
          this,
          "Joy 3",
          "Clicking Joy now gives additional +25% more points",
          1000,
          function(caller) {
            window.globals.joyClickMultiplier += 0.25;
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