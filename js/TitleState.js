class TitleState extends State {
	enter() {
		// Reset score/time when we come back to the title.
		// Moved to GameState.
		// this.game.data.score = 0;
		// this.game.data.time = 0;
	}

	handleInput(input) {
		if (input.isKeyPressed("Enter") || input.isKeyPressed("Space")) {
			this.manager.change("game");
		}
	}

	render(ctx) {
		const { canvas } = this.game;
		ctx.save();
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		ctx.fillStyle = "#111";
		ctx.fillRect(0, 0, canvas.width, canvas.height);

		ctx.fillStyle = "white";
		ctx.font = "32px Arial";
		ctx.fillText("WEB GAME DEV II", 40, 80);

		ctx.font = "18px Arial";
		ctx.fillText("TitleState", 40, 120);
		ctx.fillText("Press ENTER or SPACE to Start", 40, 160);

		ctx.font = "14px Arial";
		ctx.fillText("Tip: ESC pauses in GameState", 40, 200);
		ctx.restore();
	}
}
