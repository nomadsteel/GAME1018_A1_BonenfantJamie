// Tracks keyboard + mouse as game-friendly "Down / Pressed / Released" states.
// Browser events tell us WHEN something happened.
// Games usually need to QUERY input each frame (held/pressed/released).

class Input {
	constructor(canvas) {
		// Keyboard.
		this._down = Object.create(null);
		this._pressed = Object.create(null);
		this._released = Object.create(null);

		// Mouse.
		this.mouse = {
		x: 0,
		y: 0,
		// Buttons: 0 left, 1 middle, 2 right.
		down: [false, false, false],
		pressed: [false, false, false],
		released: [false, false, false],
		wheelDeltaY: 0
		};

		// Keyboard events.
		window.addEventListener("keydown", (ev) => {
			// Only mark "pressed" the first frame the key goes down.
			if (!this._down[ev.code]) {
				this._pressed[ev.code] = true;
			}
			this._down[ev.code] = true;
		});

		window.addEventListener("keyup", (ev) => {
			if (this._down[ev.code]) {
				this._released[ev.code] = true;
			}
			this._down[ev.code] = false;
		});

		// Mouse events (bound to the canvas).
		canvas.addEventListener("mousemove", (ev) => {
			const rect = canvas.getBoundingClientRect();
			this.mouse.x = ev.clientX - rect.left;
			this.mouse.y = ev.clientY - rect.top;
		});

		canvas.addEventListener("mousedown", (ev) => {
			const b = ev.button;
			if (!this.mouse.down[b]) {
				this.mouse.pressed[b] = true;
			}
			this.mouse.down[b] = true;
		});

		canvas.addEventListener("mouseup", (ev) => {
			const b = ev.button;
			if (this.mouse.down[b]) {
				this.mouse.released[b] = true;
			}
			this.mouse.down[b] = false;
		});

		// Mouse wheel (scroll).
		canvas.addEventListener("wheel", (ev) => {
			this.mouse.wheelDeltaY += ev.deltaY;
		}, { passive: true });

		// Optional: prevent right-click context menu in the canvas.
		canvas.addEventListener("contextmenu", (ev) => ev.preventDefault());
	} // End of constructor.

	// Called once per frame.
	clearEvents() {
		this._pressed = Object.create(null);
		this._released = Object.create(null);

		this.mouse.pressed = [false, false, false];
		this.mouse.released = [false, false, false];
		this.mouse.wheelDeltaY = 0;
	}

	// Keyboard queries.
	isKeyDown(code) { return !!this._down[code]; }
	isKeyPressed(code) { return !!this._pressed[code]; }
	isKeyReleased(code) { return !!this._released[code]; }

	// Mouse queries.
	isMouseDown(button = 0) { return !!this.mouse.down[button]; }
	isMousePressed(button = 0) { return !!this.mouse.pressed[button]; }
	isMouseReleased(button = 0) { return !!this.mouse.released[button]; }
}