// Controls switching between states (state machine).

// Two change styles are supported:
// 1) change("game") - replaces current state (calls exit/enter).
// 2) push("pause") / pop() - stack style (for PauseState overlays).

// Why have a stack style?
// - PauseState can overlay GameState without "resetting" the game.
// - When you pop, GameState resumes.

class StateManager {
	constructor(game) {
		this.game = game;
		this._states = new Map(); // name -> instance.
		this._stack = [];         // Stack of states (top is active).
	}

	add(name, stateInstance) {
		this._states.set(name, stateInstance);
	}

	get current() {
		return this._stack.length ? this._stack[this._stack.length - 1] : null;
	}

	change(name) {
		const next = this._states.get(name);
		if (!next) {
			throw new Error(`State not found: ${name}`);
		}
		const prev = this.current;
		if (prev) {
			prev.exit(next);
		}
		// Clear stack and replace with next.
		this._stack.length = 0;
		this._stack.push(next);
		next.enter(prev);
	}

	push(name) {
		const next = this._states.get(name);
		if (!next) {
			throw new Error(`State not found: ${name}`);
		}
		const prev = this.current;
		if (prev && prev.pause) {
			prev.pause(next);
		}
		this._stack.push(next);
		next.enter(prev);
	}

	pop() {
		if (this._stack.length <= 1) {
			return; // Keep at least one state.
		}
		const top = this._stack.pop();
		const next = this.current;
		top.exit(next);
		if (next && next.resume) {
			next.resume(top);
		}
	}

	handleInput(input) {
		if (this.current) {
			this.current.handleInput(input);
		}
	}

	update(dt) {
		if (this.current) {
			this.current.update(dt);
		}
	}

	render(ctx) {
		if (this.current) {
			this.current.render(ctx);
		}
	}
}
