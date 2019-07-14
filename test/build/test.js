"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bluebird_1 = require("bluebird");
const ava_1 = __importDefault(require("ava"));
const sinon = require("sinon");
const assert = require("assert");
const __1 = __importDefault(require("../.."));
ava_1.default('resolution test', (t) => __awaiter(this, void 0, void 0, function* () {
    const cb = sinon.fake();
    yield new __1.default(1000, cb).promise;
    assert(cb.args[0].length === 0);
}));
ava_1.default('rejection test', (t) => __awaiter(this, void 0, void 0, function* () {
    const cb = sinon.fake();
    let timer = new __1.default(2 * 1000, cb);
    bluebird_1.Promise.delay(1 * 1000).then(() => {
        timer.interrupt();
    });
    yield assert.rejects(timer.promise);
    yield timer.promise.catch((err) => t.log(err.stack));
    assert(cb.args[0][0] instanceof Error);
}));
//# sourceMappingURL=test.js.map