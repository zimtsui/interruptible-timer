import Bluebird from 'bluebird';

Bluebird.config({
    cancellation: true,
});

class Timer {
    private bluebird: Bluebird<void>;
    public readonly promise: Promise<void>;

    constructor(
        ms: number,
        private setTimeout = global.setTimeout,
        private clearTimeout = global.clearTimeout,
    ) {
        this.bluebird = new Bluebird<void>((resolve, reject, onCancel) => {
            const timeout = this.setTimeout(resolve, ms);
            onCancel!(() => {
                this.clearTimeout(timeout);
            });
        });

        this.promise = this.bluebird.reflect()
            .then(inspection => {
                if (inspection.isCancelled()) throw new Error('Cancelled');
            });
    }

    public interrupt() {
        this.bluebird.cancel();
    }
}

export {
    Timer as default,
    Timer,
};
