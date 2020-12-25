import WebTimer from './web-timer';
class Timer {
    constructor(ms, setTimeout = WebTimer.setTimeout, clearTimeout = WebTimer.clearTimeout) {
        this.setTimeout = setTimeout;
        this.clearTimeout = clearTimeout;
        this.promise = new Promise((resolve, reject) => {
            this.id = this.setTimeout(resolve, ms);
            this.reject = reject;
        });
    }
    interrupt() {
        this.clearTimeout(this.id);
        this.reject(new Error('Interrupted'));
    }
}
export { Timer as default, Timer, };
//# sourceMappingURL=timer.js.map