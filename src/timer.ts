import WebTimer from './web-timer';

type TimerId = any;
interface SetTimeout {
    (cb: () => void, ms: number): TimerId;
}
interface ClearTimeout {
    (id: TimerId): void;
}

class Timer {
    public promise: Promise<void>;
    private reject?: (err: Error) => void;
    private id?: TimerId;

    constructor(
        ms: number,
        setTimeout: SetTimeout,
        clearTimeout: ClearTimeout,
    );
    constructor(
        ms: number,
    );
    constructor(
        ms: number,
        private setTimeout: SetTimeout = WebTimer.setTimeout,
        private clearTimeout: ClearTimeout = WebTimer.clearTimeout,
    ) {
        this.promise = new Promise((resolve, reject) => {
            this.id = this.setTimeout(resolve, ms);
            this.reject = reject;
        });
    }

    public interrupt() {
        this.clearTimeout(this.id!);
        this.reject!(new Error('Interrupted'));
    }
}

export {
    Timer as default,
    Timer,
    SetTimeout,
    ClearTimeout,
};
