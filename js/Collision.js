// Simple collision helpers.

function aabbOverlap(a, b) { // Our AABB collision check.
	return (
		a.x < b.x + b.w &&
		a.x + a.w > b.x &&
		a.y < b.y + b.h &&
		a.y + a.h > b.y
	);
}

function pointInRect(px, py, r) {
	return (px >= r.x && px <= r.x + r.w && py >= r.y && py <= r.y + r.h);
}
