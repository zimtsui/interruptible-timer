"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bluebird_1 = require("bluebird");
var assert = require("assert");
var EventEmitter = require("events");
var Delay = (function () {
    function Delay(ms, cb) {
        var _this = this;
        this.e = new EventEmitter();
        this.state = 'RUNNING';
        this.timer = setTimeout(function () {
            _this.state = 'TIMES_OUT';
            _this.e.emit('TIMES_OUT');
        }, ms);
        if (cb) {
            this.e.once('TIMES_OUT', cb);
            this.e.once('INTERRUPTED', cb);
        }
        this.promise = new bluebird_1.Promise(function (resolve, reject) {
            _this.e.once('TIMES_OUT', resolve);
            _this.e.once('INTERRUPTED', reject);
        });
        this.promise.catch(function () { });
    }
    Delay.prototype.interrupt = function () {
        assert(this.state === 'RUNNING');
        this.state = 'INTERRUPTED';
        clearTimeout(this.timer);
        this.e.emit('INTERRUPTED', new Error('interrupted'));
    };
    return Delay;
}());
;
exports.default = Delay;
//# sourceMappingURL=index.js.map