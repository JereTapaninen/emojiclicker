define(["Shop/Items/BaseShopItem"], function(BaseShopItem) {
  /**
   * UpgradableShopItem
   * This shop item can be bought multiple times, and the effect will stay the same,
   * but the cost will go up at a steady rate.
   * This can also be capped. Use TemporaryShopItems to allow the user to buy in-between buffs.
   * These shouldn't be chained. You can but it's not adviced.
   *
   * "HOW DO I MAKE A CONTINUOUS EFFECT, E.G. AUTOCLICKER?!?!?!?!?"
   * Like this:
   *  function(caller) {
   *    let effectFunction = function(me, caller) {
   *      // stuff
   *      setTimeout(me.bind(null, me, caller), 1000);
   *    };
   *
   *    effectFunction(effectFunction, caller);
   *  }
   **/
  return class UpgradableShopItem extends BaseShopItem {
    constructor(owner, title, description, cost, costMultiplier, cap, effect) {
      super();

      this.owner = owner;
      this.title = title;
      this.description = description;
      this.cost = cost;
      this.costMultiplier = costMultiplier;
      this.cap = cap;
      this.effect = effect;
      this.amount = 0;

      this.atCap = false;
    }

    click(caller) {
      if (this.cap != -1) {
        if (this.amount >= this.cap) {
          this.atCap = true;
        }
      }

      if (!this.atCap) {
        caller.points -= this.cost;
        this.cost *= this.costMultiplier;
        this.amount++;

        this.effect(caller);

        this.owner.update();
      }
    }
  }
});