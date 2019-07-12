import { Promise as BPromise } from 'bluebird';
import test from 'ava';
import sinon = require('sinon');
import assert = require('assert');
import Delay from '../../dist/index';

test('resolution test', async t => {
    const cb = sinon.fake();
    await new Delay(1000, cb).promise;
    assert(cb.args[0].length === 0);
});

test('rejection test', async t => {
    const cb = sinon.fake();
    let timer = new Delay(2 * 1000, cb);
    BPromise.delay(1 * 1000).then(() => {
        timer.interrupt();
    });
    await assert.rejects(timer.promise);
    await timer.promise.catch((err: Error) => t.log(err.stack));
    assert(cb.args[0][0] instanceof Error);
});
