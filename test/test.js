import Promise from 'bluebird';
import delay from '~/src/index';

test('rejection test', async () => {
    const cb = jest.fn();
    const timer = delay(2 * 1000, cb);
    Promise.delay(1 * 1000).then(() => {
        timer.stop();
    });
    await expect(timer.timeout).rejects.toThrow();
    expect(cb.mock.calls[0][0]).toBeInstanceOf(Error);
});

test('resolution test', async () => {
    const cb = jest.fn();
    const timer = delay(1000, cb);
    await expect(timer.timeout).resolves.toBe();
    expect(cb.mock.calls[0].length).toBe(0);
});
