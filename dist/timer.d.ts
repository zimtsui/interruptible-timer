/// <reference types="node" />
declare class Timer {
    private setTimeout;
    private clearTimeout;
    private bluebird;
    readonly promise: Promise<void>;
    constructor(ms: number, setTimeout?: ((callback: (...args: any[]) => void, ms: number, ...args: any[]) => NodeJS.Timeout) & typeof globalThis.setTimeout, clearTimeout?: ((timeoutId: NodeJS.Timeout) => void) & typeof globalThis.clearTimeout);
    interrupt(): void;
}
export { Timer as default, Timer, };
