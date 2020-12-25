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
    promise: Promise<void>;
    private reject?;
    private id?;
    constructor(ms: number, setTimeout?: SetTimeout, clearTimeout?: ClearTimeout);
    interrupt(): void;
}
export { Timer as default, Timer, SetTimeout, ClearTimeout, TimerId, };
