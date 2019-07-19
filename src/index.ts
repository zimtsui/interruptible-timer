import Bluebird from 'bluebird';
import assert from 'assert';
import EventEmitter from 'events';
import timers from 'timers';

enum States {
    RUNNING = 'RUNNING',
    TIMES_OUT = 'TIMES_OUT',
    INTERRUPTED = 'INTERRUPTED',
}

class Timer {
    private state: States;
    private e: EventEmitter;
    private timer: NodeJS.Timeout;
    promise: Promise<void>;

    constructor(ms: number, cb: (err?: Error) => void = () => { }) {
        this.e = new EventEmitter();
        this.state = States.RUNNING;
        this.timer = timers.setTimeout(() => {
            this.state = States.TIMES_OUT;
            this.e.emit(States.TIMES_OUT);
        }, ms);

        this.e.once(States.TIMES_OUT, cb);
        this.e.once(States.INTERRUPTED, cb);

        this.promise = new Bluebird((resolve, reject) => {
            this.e.once(States.TIMES_OUT, resolve);
            this.e.once(States.INTERRUPTED, reject);
        });
        this.promise.catch(() => { });
    }

    interrupt() {
        assert(this.state === States.RUNNING);
        this.state = States.INTERRUPTED;
        timers.clearTimeout(this.timer);
        this.e.emit(States.INTERRUPTED, new Error('interrupted'));
    }
};

export default Timer;