declare class Delay {
    state: 'RUNNING' | 'TIMES_OUT' | 'INTERRUPTED';
    private e;
    private timer;
    promise: Promise<unknown>;
    constructor(ms: number, cb: any);
    interrupt(): void;
}
export default Delay;
