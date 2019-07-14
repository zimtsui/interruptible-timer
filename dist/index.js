"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var bluebird_1 = __importDefault(require("bluebird"));
var assert_1 = __importDefault(require("assert"));
var events_1 = __importDefault(require("events"));
var States;
(function (States) {
    States["RUNNING"] = "RUNNING";
    States["TIMES_OUT"] = "TIMES_OUT";
    States["INTERRUPTED"] = "INTERRUPTED";
})(States || (States = {}));
var Delay = (function () {
    function Delay(ms, cb) {
        var _this = this;
        this.e = new events_1.default();
        this.state = States.RUNNING;
        this.timer = setTimeout(function () {
            _this.state = States.TIMES_OUT;
            _this.e.emit(States.TIMES_OUT);
        }, ms);
        if (cb) {
            this.e.once(States.TIMES_OUT, cb);
            this.e.once(States.INTERRUPTED, cb);
        }
        this.promise = new bluebird_1.default(function (resolve, reject) {
            _this.e.once(States.TIMES_OUT, resolve);
            _this.e.once(States.INTERRUPTED, reject);
        });
        this.promise.catch(function () { });
    }
    Delay.prototype.interrupt = function () {
        assert_1.default(this.state === States.RUNNING);
        this.state = States.INTERRUPTED;
        clearTimeout(this.timer);
        this.e.emit(States.INTERRUPTED, new Error('interrupted'));
    };
    return Delay;
}());
;
exports.default = Delay;
//# sourceMappingURL=index.js.map