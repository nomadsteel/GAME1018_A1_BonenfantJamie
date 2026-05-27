class EndState extends State {
	handleInput(input) {
		if (input.isKeyPressed("Enter") || input.isKeyPressed("Space")) {
		  this.manager.change("title");
		}
	}

	render(ctx) {
		const { canvas, data } = this.game;

		ctx.save();
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		ctx.fillStyle = "#1a0b0b";
		ctx.fillRect(0, 0, canvas.width, canvas.height);

		ctx.fillStyle = "white";
		ctx.font = "32px Arial";
		ctx.fillText("GAME OVER", 40, 90);

		ctx.font = "18px Arial";
		ctx.fillText("EndState", 40, 130);
		ctx.fillText(`Final Score: ${data.score}`, 40, 165);
		ctx.fillText(`Time Survived: ${data.time.toFixed(1)}s`, 40, 195);

		ctx.fillText("Press ENTER or SPACE to return to Title", 40, 240);
		ctx.restore();
	}
}
