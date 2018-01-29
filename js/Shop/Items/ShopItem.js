define(["Shop/Items/BaseShopItem"], function(BaseShopItem) {
  /**
   * ShopItem
   * A regular ShopItem, after which comes a new ShopItem.
   * Chain these together. DO NOT USE THESE IN CONJUNCTION WITH UpgradableShopItems!!!
   **/
  return class ShopItem extends BaseShopItem {
    constructor(owner, title, description, cost, effect) {
      super();

      this.owner = owner;
      this.title = title;
      this.description = description;
      this.cost = cost;
      this.effect = effect;

      this.bought = false;
    }

    click(caller) {
      if (!this.bought) {
        caller.points -= this.cost;

        this.effect(caller);

        this.owner.update();

        this.bought = true;
      } else {
        console.log("[ShopItem] Item has already been bought!");
      }
    }
  }
});