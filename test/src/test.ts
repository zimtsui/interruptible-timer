import Bluebird from 'bluebird';
import Timer from '../../dist/index';
import sinon from 'sinon';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import test from 'ava';
chai.use(chaiAsPromised);
const { fake } = sinon;
const { assert } = chai;

test('fulfillment test', async t => {
    const cb = fake();
    await new Timer(1000).promise.then(cb);
    assert(cb.callCount === 1);
});

test('rejection test', async t => {
    const cb = fake();
    let timer = new Timer(2 * 1000);
    timer.promise.catch(cb);
    Bluebird.delay(1 * 1000).then(() => {
        timer.interrupt();
    });
    await assert.isRejected(timer.promise);
    await timer.promise.catch((err: Error) => t.log(err.stack));
    assert(cb.args[0][0] instanceof Error);
});
