import Promise from 'bluebird';
import test from 'ava';
import sinon from 'sinon';
import assert from 'assert';
import delay from '~/dist/index';

test('rejection test', async () => {
    const cb = sinon.fake();
    const timer = delay(2 * 1000, cb);
    Promise.delay(1 * 1000).then(() => {
        timer.stop();
    });
    await assert.rejects(timer.timeout);
    assert(cb.args[0][0] instanceof Error);
});

test('resolution test', async () => {
    const cb = sinon.fake();
    const timer = delay(1000, cb);
    await timer.timeout;
    assert(cb.args[0].length === 0);
});
