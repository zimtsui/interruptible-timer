"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bluebird_1 = __importDefault(require("bluebird"));
const assert_1 = __importDefault(require("assert"));
const events_1 = __importDefault(require("events"));
var States;
(function (States) {
    States["RUNNING"] = "RUNNING";
    States["TIMES_OUT"] = "TIMES_OUT";
    States["INTERRUPTED"] = "INTERRUPTED";
})(States || (States = {}));
class Timer {
    constructor(ms, cb = () => { }) {
        this.e = new events_1.default();
        this.state = States.RUNNING;
        this.timer = setTimeout(() => {
            this.state = States.TIMES_OUT;
            this.e.emit(States.TIMES_OUT);
        }, ms);
        this.e.once(States.TIMES_OUT, cb);
        this.e.once(States.INTERRUPTED, cb);
        this.promise = new bluebird_1.default((resolve, reject) => {
            this.e.once(States.TIMES_OUT, resolve);
            this.e.once(States.INTERRUPTED, reject);
        });
        this.promise.catch(() => { });
    }
    interrupt() {
        assert_1.default(this.state === States.RUNNING);
        this.state = States.INTERRUPTED;
        clearTimeout(this.timer);
        this.e.emit(States.INTERRUPTED, new Error('interrupted'));
    }
}
;
exports.default = Timer;
//# sourceMappingURL=index.js.map