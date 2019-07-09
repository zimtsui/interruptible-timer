"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("source-map-support/register");

var _bluebird = _interopRequireDefault(require("bluebird"));

var delay = function delay(ms, cb) {
  var stop;
  var timeout = new _bluebird["default"](function (resolve, reject) {
    var timer = setTimeout(function () {
      cb && cb();
      resolve();
    }, ms);

    stop = function stop() {
      clearTimeout(timer);
      var err = new Error('interrupted');
      cb && cb(err);
      reject(err);
    };
  });
  return {
    timeout: timeout,
    stop: stop
  };
};

var _default = delay;
exports["default"] = _default;
//# sourceMappingURL=index.js.map