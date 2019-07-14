import { Promise as BPromise } from 'bluebird';
import assert = require('assert');
import EventEmitter = require('events');

enum States {
    RUNNING, TIMES_OUT, INTERRUPTED,
}

class Delay {
    state: States;
    private e: EventEmitter;
    private timer: NodeJS.Timeout;
    promise: Promise<void>;
    constructor(ms: number, cb) {
        this.e = new EventEmitter();
        this.state = States.RUNNING;
        this.timer = setTimeout(() => {
            this.state = States.TIMES_OUT;
            this.e.emit(States.TIMES_OUT.toString());
        }, ms);

        if (cb) {
            this.e.once(States.TIMES_OUT.toString(), cb);
            this.e.once(States.INTERRUPTED.toString(), cb);
        }

        this.promise = new BPromise((resolve, reject) => {
            this.e.once(States.TIMES_OUT.toString(), resolve);
            this.e.once(States.INTERRUPTED.toString(), reject);
        });
        this.promise.catch(() => { });
    }
    interrupt() {
        assert(this.state === States.RUNNING);
        this.state = States.INTERRUPTED;
        clearTimeout(this.timer);
        this.e.emit(States.INTERRUPTED.toString(), new Error('interrupted'));
    }
};

export default Delay;