define(["Shop/Trees/ShopTree", "Shop/Items/ShopItem", "Shop/Items/UpgradableShopItem", "Shop/Items/TemporaryShopItem"], function(ShopTree, ShopItem, UpgradableShopItem, TemporaryShopItem) {
  return class ShopTreeEggplant extends ShopTree {
    constructor() {
      super(
        "ShopTreeEggplant",
        "./content/eggplant.svg"
      );

      this.subElement = $("<div id=\"" + this.title + "counter\"></div>");

      this.items = [
        new ShopItem(
          this,
          "Eggplant boss",
          "A new Eggplant boss can now appear with a base chance of 1. The boss has health and when killed it gives a drop of (boss health x click damage) x 4.",
          10000,
          function(caller) {
            window.globals.eggplantProb = 1;
          }
          ),
        new ShopItem(
          this,
          "Eggplant boss 2",
          "The base chance of the Eggplant boss is increased from 1 to 2",
          20000,
          function(caller) {
            window.globals.eggplantProb = 2;
          }
          ),
        new UpgradableShopItem(
          this,
          "Eggplant boss 3",
          "The base chance of the Eggplant boss is multiplied",
          20000,
          2.25,
          10,
          function(caller) {
            window.globals.eggplantProb *= 2;
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
        this.subElement.remove();
        this.subElement = $("<div id=\"" + this.title + "counter\"></div>");
        this.element.append(this.subElement)
        this.subElement.append("<h6>" + this.items[this.currentItemIndex].amount + "</h6>");
      }
      $("#" + this.title + "info").empty();
      $("#" + this.title + "info").append($("<p class=\"bold\">" + this.items[this.currentItemIndex].title + "</p><p id=\"" + this.title + "cost\">Cost: " + this.items[this.currentItemIndex].cost.toFixed(2) + "</p><p>" + this.items[this.currentItemIndex].description + "</p>"));
    }
  }
});