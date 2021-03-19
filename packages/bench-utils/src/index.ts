import type { Event, Suite } from "benchmark";

export function CycleLogger(event: Event) {
	console.log(`[${event.type.toUpperCase()}] ${event.target}`);
}

export function CompletionLogger(this: Suite) {
	console.log(`FASTEST: ${this.filter("fastest").map("name")}\nSLOWEST: ${this.filter("slowest").map("name")}`);
}
