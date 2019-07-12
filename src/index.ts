import { Promise as BPromise } from 'bluebird';
import assert = require('assert');
import EventEmitter = require('events');
class Delay {
    state: 'RUNNING' | 'TIMES_OUT' | 'INTERRUPTED';
    private e: EventEmitter;
    private timer: NodeJS.Timeout;
    promise: Promise<unknown>;
    constructor(ms: number, cb) {
        this.e = new EventEmitter();
        this.state = 'RUNNING';
        this.timer = setTimeout(() => {
            this.state = 'TIMES_OUT';
            this.e.emit('TIMES_OUT');
        }, ms);

        if (cb) {
            this.e.once('TIMES_OUT', cb);
            this.e.once('INTERRUPTED', cb);
        }

        this.promise = new BPromise((resolve, reject) => {
            this.e.once('TIMES_OUT', resolve);
            this.e.once('INTERRUPTED', reject);
        });
        this.promise.catch(() => { });
    }
    interrupt() {
        assert(this.state === 'RUNNING');
        this.state = 'INTERRUPTED';
        clearTimeout(this.timer);
        this.e.emit('INTERRUPTED', new Error('interrupted'));
    }
};

export default Delay;