import EventEmitter from "eventemitter3";
import chai from "chai";
const { assert } = chai;
class Timer {
    constructor(ms, cb = () => { }) {
        this.state = "RUNNING" /* RUNNING */;
        this.e = new EventEmitter();
        this.timer = setTimeout(() => {
            this.state = "TIMES_OUT" /* TIMES_OUT */;
            this.e.emit("TIMES_OUT" /* TIMES_OUT */);
        }, ms);
        this.e.once("TIMES_OUT" /* TIMES_OUT */, cb);
        this.e.once("INTERRUPTED" /* INTERRUPTED */, cb);
        this.promise = new Promise((resolve, reject) => {
            this.e.once("TIMES_OUT" /* TIMES_OUT */, resolve);
            this.e.once("INTERRUPTED" /* INTERRUPTED */, reject);
        });
        this.promise.catch(() => { });
    }
    interrupt() {
        assert(this.state === "RUNNING" /* RUNNING */);
        this.state = "INTERRUPTED" /* INTERRUPTED */;
        clearTimeout(this.timer);
        this.e.emit("INTERRUPTED" /* INTERRUPTED */, new Error("interrupted"));
    }
}
export { Timer as default, Timer, };
//# sourceMappingURL=timer.js.map