import Bluebird from 'bluebird';
Bluebird.config({
    cancellation: true,
});
class Timer {
    constructor(ms, setTimeout = global.setTimeout, clearTimeout = global.clearTimeout) {
        this.setTimeout = setTimeout;
        this.clearTimeout = clearTimeout;
        this.bluebird = new Bluebird((resolve, reject, onCancel) => {
            const timeout = this.setTimeout(resolve, ms);
            onCancel(() => {
                this.clearTimeout(timeout);
            });
        });
        this.promise = this.bluebird.reflect()
            .then(inspection => {
            if (inspection.isCancelled())
                throw new Error('Cancelled');
        });
    }
    interrupt() {
        this.bluebird.cancel();
    }
}
export { Timer as default, Timer, };
//# sourceMappingURL=timer.js.map