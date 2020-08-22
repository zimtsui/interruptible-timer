/// <reference types="./fake.d.ts" />

function fake() {
    let count = 0;
    const args = [];
    function callback(...argList) {
        count++;
        args.push(argList);
    }
    Reflect.defineProperty(callback, 'args', {
        get() {
            return args;
        },
    });
    return callback;
}

export default fake;
