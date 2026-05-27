class GameState extends State {
	enter() {
		const { canvas, data } = this.game; // This line is called object destructuring (not destructing).
		// It is the same as writing: const canvas = this.game.canvas;

		data.score = 0;
		data.time = 0;

		// Initializing game entities goes here.
		this.objects = new Map();

		this.objects.set("player", new PlayerObject(this.game, 60, 160, 40, 40));
		this.objects.set("obstacle", new ObstacleObject(this.game, canvas.width / 2 - 60, canvas.height / 2 - 30, 120, 60));
		this.objects.set("goal", new GoalObject(this.game, canvas.width - 90, canvas.height - 90, 50, 50));

		this._mouseX = 0;
		this._mouseY = 0;
	}

	handleInput(input) {
		// Pause.
		if (input.isKeyPressed("Escape")) {
			this.manager.push("pause");
			return;
		}
		for (const OBJ of this.objects.values()) {
			OBJ.handleInput?.(input);
		}
	} // End of handleInput.

	update(dt) {
		const { canvas, data } = this.game;
		data.time += dt; // Destructured above so we don't have to write: this.game.data.time

		// Update mouse, so it doesn't change in render.
		this._mouseX = this.game.input.mouse.x;
		this._mouseY = this.game.input.mouse.y;

		for (const OBJ of this.objects.values()) {
			OBJ.update?.(dt);
		}

		// Collision checks.
		const PLAYER = this.objects.get("player");
		const GOAL = this.objects.get("goal");
		if (aabbOverlap(PLAYER, this.objects.get("obstacle"))) {
			this.manager.change("end");
			return;
		}

		if (aabbOverlap(PLAYER, GOAL)) {
			data.score += 100;
			GOAL.x = Math.random() * (canvas.width - GOAL.w);
			GOAL.y = Math.random() * (canvas.height - GOAL.h);
			/* Problem. Our goal can spawn anywhere, including over the player and/or obstacle.
			   How can we prevent the goal from spawning over the player or obstacle?
			   Think of what control structures and variabled you would need. E.g. if/while? */
		}
	} // End of update.

	render(ctx) {
		const { canvas, input, data } = this.game; // Destructuring three things. All are used here. 

		ctx.save();
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		// Background.
		ctx.fillStyle = "#0b1020";
		ctx.fillRect(0, 0, canvas.width, canvas.height);

		for (const OBJ of this.objects.values()) {
			OBJ.render?.(ctx);
		}

		// UI text.
		ctx.fillStyle = "white";
		ctx.font = "16px Arial";
		ctx.fillText(`GameState | Score: ${data.score}`, 16, 24);
		ctx.fillText(`Time: ${data.time.toFixed(1)}s`, 16, 46);
		ctx.fillText(`Mouse: (${Math.round(this._mouseX)}, ${Math.round(this._mouseY)})`, 16, 68);
		ctx.fillText(`ESC = Pause`, 16, 92);

		ctx.restore();
	} // End of render.

	pause() {
		// If you want: stop sounds, etc.
	}

	resume() {
		// If you want: resume sounds, etc.
	}
}
