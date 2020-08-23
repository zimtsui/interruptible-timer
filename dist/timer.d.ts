declare class Timer {
    private state;
    private e;
    private timer;
    promise: Promise<void>;
    constructor(ms: number, cb?: (err?: Error) => void);
    interrupt(): void;
}
export { Timer as default, Timer, };
