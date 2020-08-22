const { assert } = console;

const enum States {
    RUNNING = 'RUNNING',
    TIMES_OUT = 'TIMES_OUT',
    INTERRUPTED = 'INTERRUPTED',
}

class Timer {
    private state: States;
    private e: EventTarget;
    private timer: number;
    promise: Promise<void>;

    constructor(ms: number, cb: (err?: Error) => void = () => { }) {
        this.e = new EventTarget();
        this.state = States.RUNNING;
        this.timer = setTimeout(() => {
            this.state = States.TIMES_OUT;
            this.e.dispatchEvent(new Event(States.TIMES_OUT));
        }, ms);

        this.e.addEventListener(States.TIMES_OUT, event => cb(), { once: true });
        this.e.addEventListener(States.INTERRUPTED, event => cb((<ErrorEvent>event).error), { once: true });

        this.promise = new Promise((resolve, reject) => {
            this.e.addEventListener(States.TIMES_OUT, event => resolve(), { once: true });
            this.e.addEventListener(
                States.INTERRUPTED,
                (errEvent: Event) => reject((<ErrorEvent>errEvent).error),
                { once: true },
            );
        });
        this.promise.catch(() => { });
    }

    interrupt() {
        assert(this.state === States.RUNNING);
        this.state = States.INTERRUPTED;
        clearTimeout(this.timer);
        this.e.dispatchEvent(new ErrorEvent(
            States.INTERRUPTED,
            { error: new Error('interrupted') },
        ));
    }
}

export {
    Timer as default,
    Timer,
}