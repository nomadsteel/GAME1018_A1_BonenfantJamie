class PlayerObject extends GameObject {
    constructor(game, x, y, w, h, speed = 250) {
        super(game, x, y, w, h);
        this.speed = speed;
        this._moveX = 0;
        this._moveY = 0;
    }

    handleInput(input) {
		// WASD / arrows (HELD). I kept this as it's common.
		this._moveX = 0;
		this._moveY = 0;
		if (input.isKeyDown("ArrowLeft") || input.isKeyDown("KeyA")) {
			this._moveX -= 1;
		}
		if (input.isKeyDown("ArrowRight") || input.isKeyDown("KeyD")) {
			this._moveX += 1;
		}
		if (input.isKeyDown("ArrowUp") || input.isKeyDown("KeyW")) {
			this._moveY -= 1;
		}
		if (input.isKeyDown("ArrowDown") || input.isKeyDown("KeyS")) {
			this._moveY += 1;
		}
	}

	update(dt) {
		const { canvas, data } = this.game;

		// Normalize diagonal movement.
		let mx = this._moveX;
		let my = this._moveY;
		if (mx !== 0 && my !== 0) {
			const adj = 1 / Math.sqrt(2);
			mx *= adj;
			my *= adj;
		}

		// Set player's position.
		this.x += mx * this.speed * dt;
		this.y += my * this.speed * dt;

		// Clamp player inside canvas bounds.
		this.x = clamp(this.x, 0, canvas.width - this.w);
		this.y = clamp(this.y, 0, canvas.height - this.h);
	}

	render(ctx) {
		ctx.fillStyle = "#4aa3ff";
		ctx.fillRect(this.x, this.y, this.w, this.h);
	}
}