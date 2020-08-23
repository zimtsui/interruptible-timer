import EventEmitter from "eventemitter3";
import chai from "chai";
const { assert } = chai;

const enum States {
    RUNNING = "RUNNING",
    TIMES_OUT = "TIMES_OUT",
    INTERRUPTED = "INTERRUPTED",
}

class Timer {
    private state = States.RUNNING;
    private e = new EventEmitter();
    private timer: NodeJS.Timer;
    promise: Promise<void>;

    constructor(ms: number, cb: (err?: Error) => void = () => { }) {
        this.timer = setTimeout(() => {
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
        clearTimeout(this.timer);
        this.e.emit(States.INTERRUPTED, new Error("interrupted"));
    }
}

export {
    Timer as default,
    Timer,
};
