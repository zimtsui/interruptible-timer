import Bluebird from 'bluebird';
import test from 'ava';
import sinon from 'sinon';
import assert from 'assert';
import Timer from '../..';

test('resolution test', async t => {
    const cb = sinon.fake();
    await new Timer(1000, cb).promise;
    assert(cb.args[0].length === 0);
});

test('rejection test', async t => {
    const cb = sinon.fake();
    let timer = new Timer(2 * 1000, cb);
    Bluebird.delay(1 * 1000).then(() => {
        timer.interrupt();
    });
    await assert.rejects(timer.promise);
    await timer.promise.catch((err: Error) => t.log(err.stack));
    assert(cb.args[0][0] instanceof Error);
});
