define([], function() {
  return class DisappearingText {
    /**
     * SIZE MUST BE IN CSS FORMAT
     * (eg. 14vmax, 12px, 1em, 2rem...)
     **/
    constructor(text, posX, posY, size, maxTickCount) {
      this.destroyMe = false;

      this.posX = posX;
      this.posY = posY;

      this.tcR = 0;
      this.tcG = 0;
      this.tcB = 0;
      this.tcA = 1;
      this.textColor = "rgba(" + this.tcR + ", " + this.tcG + ", " + this.tcB + ", " + this.tcA + ")";

      if (typeof size == "undefined") {
        this.size = "1vmax";
      } else {
        this.size = size;
      }

      if (typeof maxTickCount == "undefined") {
        this.maxTickCount = 50;
      } else {
        this.maxTickCount = maxTickCount;
      }
      this.tickCount = 0;

      this.element = $("<div class=\"disappearingText\">" + text + "</div>");
      this.element.css({"top": posY + "px", "left": posX + "px", "color": this.textColor, "font-size": this.size});

      $("body").append(this.element);
    }

    update() {
      this.tickCount++;

      this.posY-=2;
      this.tcA -= 0.02 / (this.maxTickCount / 50);
      this.textColor = "rgba(" + this.tcR + ", " + this.tcG + ", " + this.tcB + ", " + this.tcA + ")";
      this.element.css({"top": this.posY + "px", "left": this.posX + "px", "color": this.textColor, "font-size": this.size});

      if (this.tickCount >= this.maxTickCount) {
        this.destroyMe = true;
      }
    }
  }
});