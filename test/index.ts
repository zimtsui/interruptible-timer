import { Bluebird } from '../dev-deps.ts';
import Timer from '../index.ts';
import fake from './fake.js';
import { asserts } from '../dev-deps.ts';
const { assertThrowsAsync } = asserts;
const assert: typeof asserts.assert = asserts.assert;

Deno.test('resolution test', async () => {
    const cb = fake();
    await new Timer(1000, cb).promise;
    assert(cb.args[0].length === 0);
});

Deno.test('rejection test', async () => {
    const cb = fake();
    let timer = new Timer(2 * 1000, cb);
    Bluebird.delay(1 * 1000).then(() => {
        timer.interrupt();
    });
    await assertThrowsAsync(() => timer.promise);
    // await timer.promise.catch((err: Error) => t.log(err.stack));
    assert(cb.args[0][0] instanceof Error);
});
