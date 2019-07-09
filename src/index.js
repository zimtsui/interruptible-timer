import Promise from 'bluebird';

const delay = (ms, cb) => {
    let stop;
    const timeout = new Promise((resolve, reject) => {
        const timer = setTimeout(() => {
            cb && cb();
            resolve();
        }, ms);
        stop = () => {
            clearTimeout(timer);
            const err = new Error('interrupted');
            cb && cb(err);
            reject(err);
        };
    });
    return {
        timeout,
        stop,
    };
};

export default delay;
