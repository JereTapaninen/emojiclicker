define([], function() {
  return class Emoji {
    constructor() {
    }

    click(caller, ev) {
      throw new TypeError("Click-event not defined; base-class method called");
    }

    customEvent(me, caller, ev) {
      throw new TypeError("CustomEvent-event not defined; base-class method called");
    }

    activate() {
    }
  }
});