// Base class for all game objects that appear in a state.

class GameObject {
    constructor(game, x, y, w, h) {
        this.game = game;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.active = true; // Optional. Because Unity. :)
    }

    // Define empty lifecycle functions.
    handleInput(/*input*/) {}
    update(/*dt*/) {}
    render(/*ctx*/) {}
}
