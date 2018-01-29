define(["Misc/TextEval", "Misc/VisibleText", "Shop/Items/UpgradableShopItem", "Shop/Items/ShopItem"], function(TextEval, VisibleText, UpgradableShopItem, ShopItem) {
  /**
   * Base class ShopTree
   * This class is used to create new Shop Trees, from which
   * the user can buy new emojis, buffs, etc.
   * This class should never be directly created. It should always be *extended*.
   *
   * DO NOT DO THIS: new ShopTree(title, icon);
   * DO THIS: class ShopTreeX extends ShopTree
   * THEN DO THIS: new ShopTreeX(args)
   **/
  return class ShopTree {
    /**
     * Constructor
     * title - The title of the ShopTree. Should be something like "ShopTree%Name%", or the same as the class name.
     * icon - The icon of the ShopTree. Should be in the form of "./content/%Name%.svg"
     **/
    constructor(title, icon) { 
      this.title = title;
      this.icon = icon;
      this.items = [];
      this.currentItemIndex = 0;
      
      this.element = $("<li class=\"shoptree\" id=\"" + this.title + "\"></li>");
      this.element.append($("<img src=\"" + this.icon + "\" class=\"shoptreeicon\" alt=\"\" />"));
      this.element.append($("<div id=\"" + this.title + "info\"><p class=\"bold\">SHOPITEMTITLE</p><p id=\"" + this.title + "cost\">Cost: SHOPITEMCOST</p><p>SHOPITEMDESCRIPTION</p></div>"));

      $("#shop").append(this.element);

      const tEvalSoldOut = new TextEval("SOLD OUT", "1vmax", "Segoe UI, sans-serif");
      const posSoldOut = [
        this.element.position().left + (this.element.width() / 2) - (tEvalSoldOut.width / 12),
        this.element.position().top + (this.element.height() / 2)
      ];
      tEvalSoldOut.dispose();

      this.textSoldOut = new VisibleText(
        "SOLD OUT!",
        posSoldOut[0],
        posSoldOut[1],
        [255, 255, 255, 1],
        "Segoe UI, sans-serif",
        "1vmax",
        {"font-weight": "bold", "text-shadow": "2px 2px #000000"},
        false);

      const tEvalNotEnoughPoints = new TextEval("NOT ENOUGH POINTS!", "1vmax", "Segoe UI, sans-serif");
      const posNotEnoughPoints = [
        this.element.position().left + (this.element.width() / 2) - (tEvalNotEnoughPoints.width / 12),
        this.element.position().top + (this.element.height() / 2)
      ];
      tEvalNotEnoughPoints.dispose();

      this.textNotEnoughPoints = new VisibleText(
        "NOT ENOUGH POINTS!",
        posNotEnoughPoints[0],
        posNotEnoughPoints[1],
        [255, 255, 255, 1],
        "Segoe UI, sans-serif",
        "1vmax",
        {"font-weight": "bold", "text-shadow": "2px 2px #000000"},
        false);
    }

    reconfigurate() {
      this.element.remove();

      this.element = $("<li class=\"shoptree\" id=\"" + this.title + "\"></li>");
      this.element.append($("<img src=\"" + this.icon + "\" class=\"shoptreeicon\" alt=\"\" />"));
      this.element.append($("<div id=\"" + this.title + "info\"><p class=\"bold\">" + this.items[this.currentItemIndex].title + "</p><p id=\"" + this.title + "cost\">Cost: " + 
        this.items[this.currentItemIndex].cost.toFixed(2) + "</p><p>" + this.items[this.currentItemIndex].description + "</p></div>"));
      if (this.items[this.currentItemIndex] instanceof UpgradableShopItem) { // upgradable shop item
        this.element.append($("<div id=\"" + this.title + "counter\"><h6>0</h6></div>"));
      }

      $("#shop").append(this.element);

      this.reconfigurateTexts();
    }

    /**
     * Reconfigs the text placement of "Sold Out" and "Not Enough Points"
     **/
    reconfigurateTexts() {
      const tEvalSoldOut = new TextEval("SOLD OUT", "1vmax", "Segoe UI, sans-serif");
      const posSoldOut = [
        this.element.position().left + (this.element.width() / 2) - (tEvalSoldOut.width / 12),
        this.element.position().top + (this.element.height() / 2)
      ];
      tEvalSoldOut.dispose();

      this.textSoldOut.changePosition(posSoldOut);

      const tEvalNotEnoughPoints = new TextEval("NOT ENOUGH POINTS!", "1vmax", "Segoe UI, sans-serif");
      const posNotEnoughPoints = [
        this.element.position().left + (this.element.width() / 2) - (tEvalNotEnoughPoints.width / 12),
        this.element.position().top + (this.element.height() / 2)
      ];
      tEvalNotEnoughPoints.dispose();

      this.textNotEnoughPoints.changePosition(posNotEnoughPoints);
    }

    click(caller) {
      if (this.currentItemIndex >= this.items.length) {
        throw new Error("Current Item Index is larger than the item pool.");
      } else if (this.currentItemIndex < 0) {
        throw new Error("Current Item Index is smaller than 0.");
      } else if (typeof caller == "undefined") {
        throw new Error("Caller is undefined.");
      } else if (this.items[this.currentItemIndex].bought) {
        console.info("[ShopTree] The last item has already been bought!");
      } else {
        this.items[this.currentItemIndex].click(caller);
      }

      this.reconfigurateTexts();
    }

    update() {
      throw new TypeError("Update-event not defined; base-class method called");
    }
  }
});