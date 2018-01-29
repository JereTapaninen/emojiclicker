define(["Shop/Trees/ShopTree", "Shop/Items/ShopItem"], function(ShopTree, ShopItem) {
  return class ShopTreeThinking extends ShopTree {
    constructor() {
      super(
        "ShopTreeThinking",
        "./content/thinking.svg"
      );

      this.items = [
        new ShopItem(
          this,
          "Thinking",
          "A new thinking emoji can now spawn",
          1000,
          function(caller) {
            window.globals.thinkingProb = 0.1;
          }
          ),
      ];

      super.reconfigurate();
    }
  }
});