// Base class for all game states.
// (TitleState, GameState, PauseState, EndState).
// We include handleInput/render too because games usually separate those.
// Optional: pause/resume are used when PauseState is pushed on top of GameState.

class State {
	constructor(game) {
		this.game = game; // { canvas, ctx, input, states, data }
		this.manager = game.states; // Every state subclass has a more direct reference to the StateManager.
	}

	enter(/*prevState*/) {}
	exit(/*nextState*/) {}

	// Optional for stack-based pause.
	pause() {}
	resume() {}

	handleInput(/*input*/) {}
	update(/*dt*/) {}
	render(/*ctx*/) {}
}
