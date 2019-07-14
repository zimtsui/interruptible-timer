declare enum States {
    RUNNING = 0,
    TIMES_OUT = 1,
    INTERRUPTED = 2
}
declare class Delay {
    state: States;
    private e;
    private timer;
    promise: Promise<void>;
    constructor(ms: number, cb: any);
    interrupt(): void;
}
export default Delay;
