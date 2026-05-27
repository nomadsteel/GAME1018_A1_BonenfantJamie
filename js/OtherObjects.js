class ObstacleObject extends GameObject {
    constructor(game, x, y, w, h) {
        super(game, x, y, w, h);
    }

    render(ctx) {
        ctx.fillStyle = "#b23a48";
        ctx.fillRect(this.x, this.y, this.w, this.h);
    }
}

class GoalObject extends GameObject {
    constructor(game, x, y, w, h) {
        super(game, x, y, w, h);
    }

    handleInput(input) {
        // Mouse click. Move the goal to where we left-click.
        if (input.isMousePressed(0)) {
            this.x = input.mouse.x - this.w / 2;
            this.y = input.mouse.y - this.h / 2;
            this.game.data.score += 1; // Small feedback reward.
        }
    }

    render(ctx) {
        ctx.fillStyle = "#1fa774";
        ctx.fillRect(this.x, this.y, this.w, this.h);
    }
}