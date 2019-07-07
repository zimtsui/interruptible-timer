import Promise from 'bluebird';

const delay = (ms, cb) => {
    let stop;
    const promise = new Promise((resolve, reject) => {
        const timeout = setTimeout(() => {
            if (cb) cb();
            resolve();
        }, ms);
        stop = () => {
            clearTimeout(timeout);
            const err = new Error('interrupted');
            if (cb) cb(err);
            reject(err);
        };
    });
    return {
        timeout: promise,
        stop,
    };
};

export default delay;
