import EventEmitter from "eventemitter3";
import chai from "chai";
const { assert } = chai;

const enum States {
    RUNNING = "RUNNING",
    TIMES_OUT = "TIMES_OUT",
    INTERRUPTED = "INTERRUPTED",
}

interface SetTimeout<Timeout> {
    (cb: () => unknown, ms: number): Timeout;
}

interface ClearTimeout<Timeout> {
    (timeout: Timeout): unknown;
}

class Timer<Timeout> {
    private state = States.RUNNING;
    private e = new EventEmitter();
    private timeout: Timeout;
    promise: Promise<void>;

    constructor(
        ms: number,
        cb: (err?: Error) => void = () => { },
        private setTimeout: SetTimeout<Timeout>,
        private clearTimeout: ClearTimeout<Timeout>,
    ) {
        this.timeout = this.setTimeout(() => {
            this.state = States.TIMES_OUT;
            this.e.emit(States.TIMES_OUT);
        }, ms);

        this.e.once(States.TIMES_OUT, cb);
        this.e.once(States.INTERRUPTED, cb);

        this.promise = new Promise((resolve, reject) => {
            this.e.once(States.TIMES_OUT, resolve);
            this.e.once(States.INTERRUPTED, reject);
        });
        this.promise.catch(() => { });
    }

    interrupt() {
        assert(this.state === States.RUNNING);
        this.state = States.INTERRUPTED;
        this.clearTimeout(this.timeout);
        this.e.emit(States.INTERRUPTED, new Error("interrupted"));
    }
}

export {
    Timer as default,
    Timer,
};
