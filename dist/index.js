"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bluebird_1 = require("bluebird");
var assert = require("assert");
var EventEmitter = require("events");
var States;
(function (States) {
    States[States["RUNNING"] = 0] = "RUNNING";
    States[States["TIMES_OUT"] = 1] = "TIMES_OUT";
    States[States["INTERRUPTED"] = 2] = "INTERRUPTED";
})(States || (States = {}));
var Delay = (function () {
    function Delay(ms, cb) {
        var _this = this;
        this.e = new EventEmitter();
        this.state = States.RUNNING;
        this.timer = setTimeout(function () {
            _this.state = States.TIMES_OUT;
            _this.e.emit(States.TIMES_OUT.toString());
        }, ms);
        if (cb) {
            this.e.once(States.TIMES_OUT.toString(), cb);
            this.e.once(States.INTERRUPTED.toString(), cb);
        }
        this.promise = new bluebird_1.Promise(function (resolve, reject) {
            _this.e.once(States.TIMES_OUT.toString(), resolve);
            _this.e.once(States.INTERRUPTED.toString(), reject);
        });
        this.promise.catch(function () { });
    }
    Delay.prototype.interrupt = function () {
        assert(this.state === States.RUNNING);
        this.state = States.INTERRUPTED;
        clearTimeout(this.timer);
        this.e.emit(States.INTERRUPTED.toString(), new Error('interrupted'));
    };
    return Delay;
}());
;
exports.default = Delay;
//# sourceMappingURL=index.js.map