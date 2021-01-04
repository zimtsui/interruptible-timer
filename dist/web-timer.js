export var WebTimer;
(function (WebTimer) {
    function setTimeout(cb, ms) {
        if (ms)
            return [ms, globalThis.setTimeout(cb, ms)];
        else
            return [ms, globalThis.setImmediate(cb)];
    }
    WebTimer.setTimeout = setTimeout;
    function clearTimeout([ms, id]) {
        if (ms)
            globalThis.clearTimeout(id);
        else
            globalThis.clearImmediate(id);
    }
    WebTimer.clearTimeout = clearTimeout;
})(WebTimer || (WebTimer = {}));
export default WebTimer;
//# sourceMappingURL=web-timer.js.map