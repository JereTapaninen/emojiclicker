define(["Shop/Trees/ShopTreeClicker", "Shop/Trees/ShopTreeJoy", "Shop/Trees/ShopTreeHeartEyes", "Shop/Trees/ShopTreeThinking", "Shop/Trees/ShopTreeEggplant"], 
  function(ShopTreeClicker, ShopTreeJoy, ShopTreeHeartEyes, ShopTreeThinking, ShopTreeEggplant) {
  return class Shop {
    constructor() {
      this.trees = [ new ShopTreeClicker(), new ShopTreeJoy(), new ShopTreeHeartEyes(), new ShopTreeThinking(),
      new ShopTreeEggplant() ];
      console.log("%c[Shop] Shop trees loaded", 'color: rgb(0, 0, 150)');
    }
  }
});