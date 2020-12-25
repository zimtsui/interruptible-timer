declare type TimerId = any;
interface SetTimeout {
    (cb: () => void, ms: number): TimerId;
}
interface ClearTimeout {
    (id: TimerId): void;
}
declare class Timer {
    private setTimeout;
    private clearTimeout;
    private bluebird;
    readonly promise: Promise<void>;
    constructor(ms: number, setTimeout?: SetTimeout, clearTimeout?: ClearTimeout);
    interrupt(): void;
}
export { Timer as default, Timer, };
