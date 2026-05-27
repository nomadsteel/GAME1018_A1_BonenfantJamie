// Set up the canvas.
const CANVAS = document.getElementById("gameCanvas");
const CTX = CANVAS.getContext("2d");
CTX.imageSmoothingEnabled = true;

// Input (keyboard + mouse) as Down/Pressed/Released.
const INPUT = new Input(CANVAS);

// "Game" context shared by states.
const GAME = {
	canvas: CANVAS,
	ctx: CTX,
	input: INPUT,
	data: {
		score: 0, // Sample game data.
		time: 0
	},
	states: null // Assigned below.
};

// State manager and state registration. Note the passing of references.
const STATES = new StateManager(GAME);
GAME.states = STATES;

STATES.add("title", new TitleState(GAME));
STATES.add("game", new GameState(GAME));
STATES.add("pause", new PauseState(GAME));
STATES.add("end", new EndState(GAME));

STATES.change("title"); // Set initial state.

// Engine variables.
let lastTime = 0;

// Main loop.
function gameLoop(timestamp) {
	const DT = (timestamp - lastTime) / 1000;
	lastTime = timestamp;

	handleInput();
	update(DT);
	render();

	// Clear pressed/released events every frame (so they last 1 frame).
	INPUT.clearEvents();

	requestAnimationFrame(gameLoop);
	// The above line asks the browser to invoke gameLoop in the next tick/frame.
	// A timestamp (number of ms since start) is automatically passed to gameLoop.
}

// Handle input (keyboard/mouse).
function handleInput() {
	STATES.handleInput(INPUT);
}

// Update game state (positions, collisions, timers, etc.).
function update(DT) {
	STATES.update(DT);
}

// Render everything to the canvas.
function render() {
	STATES.render(CTX);
}

// Start the engine!
requestAnimationFrame(gameLoop);
