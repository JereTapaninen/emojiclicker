define([], function() {
  return class TextEval {
    /**
     * SIZE MUST BE IN CSS FORMAT
     * (eg. 14vmax, 12px, 1em, 2rem...)
     **/
    constructor(text, size, fontFamily) {
      this.element = $("<div class=\"invisible\">" + text + "</div>");
      this.element.css("font-size", size);

      if (typeof fontFamily != "undefined")
        this.element.css("font-family", fontFamily);

      $("body").append(this.element);
    }

    dispose() {
      this.element.remove();
    }

    get width() {
      return this.element.width();
    }

    get height() {
      return this.element.height();
    }
  }
});