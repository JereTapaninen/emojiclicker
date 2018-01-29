define(["Shop/Items/BaseShopItem"], function(BaseShopItem) {
  /**
   * TemporaryShopItem
   * This ShopItem should be used mainly in between UpgradableShopItems.
   * Results are unknown as to what will happen if you use this regularly like ShopItem,
   * SO DO NOT DO IT.
   **/
  return class TemporaryShopItem extends BaseShopItem {
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
      caller.points -= this.cost;

      this.effect(caller);

      this.owner.update();

      this.bought = true;
    }
  }
});