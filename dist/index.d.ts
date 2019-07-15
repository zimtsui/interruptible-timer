declare enum States {
    RUNNING = "RUNNING",
    TIMES_OUT = "TIMES_OUT",
    INTERRUPTED = "INTERRUPTED"
}
declare class Timer {
    state: States;
    private e;
    private timer;
    promise: Promise<void>;
    constructor(ms: number, cb: (err?: Error) => void);
    interrupt(): void;
}
export default Timer;
