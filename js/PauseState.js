class PauseState extends State {
	handleInput(input) {
		// Pop pause.
		if (input.isKeyPressed("Escape")) {
			this.manager.pop();
			return;
		}

		// Optional: restart game directly from pause.
		if (input.isKeyPressed("KeyR")) {
			this.manager.change("game");
			return;
		}

		// Optional: go back to title.
		if (input.isKeyPressed("KeyT")) {
			this.manager.change("title");
			return;
		}
	}

	render(ctx) {
		const { canvas } = this.game;
		// Render underlying GameState.
		if (this.manager._stack.length == 2) {
			const under = this.manager._stack[this.manager._stack.length - 2];
			if (under) {
				under.render(ctx);
			}
		}

		// Now draw a translucent overlay.
		ctx.save();
		ctx.fillStyle = "rgba(0,0,0,0.55)";
		ctx.fillRect(0, 0, canvas.width, canvas.height);

		ctx.fillStyle = "white";
		ctx.font = "32px Arial";
		ctx.fillText("PAUSED", 40, 90);

		ctx.font = "18px Arial";
		ctx.fillText("PauseState", 40, 130);
		ctx.fillText("ESC = Resume", 40, 165);
		ctx.fillText("R = Restart | T = Title", 40, 195);

		ctx.restore();
	}
}
