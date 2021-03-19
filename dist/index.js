"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompletionLogger = exports.CycleLogger = void 0;
function CycleLogger(event) {
    console.log(`[${event.type.toUpperCase()}] ${event.target}`);
}
exports.CycleLogger = CycleLogger;
function CompletionLogger() {
    console.log(`FASTEST: ${this.filter("fastest").map("name")}\nSLOWEST: ${this.filter("slowest").map("name")}`);
}
exports.CompletionLogger = CompletionLogger;
