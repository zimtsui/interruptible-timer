interface SetTimeout<Timeout> {
    (cb: () => unknown, ms: number): Timeout;
}
interface ClearTimeout<Timeout> {
    (timeout: Timeout): unknown;
}
declare class Timer<Timeout> {
    private setTimeout;
    private clearTimeout;
    private state;
    private e;
    private timeout;
    promise: Promise<void>;
    constructor(ms: number, cb: ((err?: Error | undefined) => void) | undefined, setTimeout: SetTimeout<Timeout>, clearTimeout: ClearTimeout<Timeout>);
    interrupt(): void;
}
export { Timer as default, Timer, };
