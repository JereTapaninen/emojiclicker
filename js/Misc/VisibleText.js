define([], function() {
  /** 
   * VisibleText
   * Instead of DisappearingText, this text stays on-screen until hidden/disposed.
   * Use responsibly! Large amounts of VisibleTexts can and will fuck over your performance!
   **/
  return class VisibleText {
    /**
     * Constructor of VisibleText
     * text - the text of the text (kek)
     * posX - the x-position of the text, use TextEval to center
     * posY - the y-position of the text, use TextEval to center
     * color - the color of the text. Must be in array & RGBA form (-> [ R, G, B, A ]). Alpha ranges from 0 - 1, while RGB ranges from 0 - 255.
     * fontFamily - the font family, as a string. Could be for example "Tahoma", but also "Tahoma, Verdana, sans-serif", etc.
     * size - the size of the text. THIS MUST BE IN CSS FORM, so with "vmax", "px", or whatever. FOR EXAMPLE: "1vmax"
     * customCSS - extra custom CSS to add. Must be like this: { "attribute1": value, "attribute2": value }. Set as {} if empty.
     * visible - true/false
     **/
    constructor(text, posX, posY, color, fontFamily, size, customCSS, visible) {
      this.destroyMe = false;

      this.text = text;
      this.posX = posX;
      this.posY = posY;
      this.color = color;
      this.fontFamily = fontFamily;
      this.size = size;
      this.customCSS = customCSS;

      this.element = $("<div class=\"gametext\">" + text + "</div>");
      this.element.css({"top": this.posY, "left": this.posX, "color": "rgba(" + this.color[0] + ", " + this.color[1] + ", " + this.color[2] + ", " + this.color[3] + ")",
        "font-family": this.fontFamily, "font-size": this.size});
      this.element.css(this.customCSS);

      $("body").append(this.element);

      if (!visible)
        this.hide();
    }

    show() {
      this.element.css({"display": "block", "visibility": "visible"});
    }

    hide() {
      this.element.css({"display": "none", "visibility": "hidden"});
    }

    changePosition(position) {
      this.posX = position[0];
      this.posY = position[1];
      this.element.css({"top": this.posY, "left": this.posX});
    }

    dispose() {
      this.element.remove();
      this.destroyMe = true;
    }
  }
});