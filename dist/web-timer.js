export var WebTimer;
(function (WebTimer) {
    function setTimeout(cb, ms) {
        if (ms)
            return [ms, global.setTimeout(cb, ms)];
        else
            return [ms, global.setImmediate(cb)];
    }
    WebTimer.setTimeout = setTimeout;
    function clearTimeout([ms, id]) {
        if (ms)
            global.clearTimeout(id);
        else
            global.clearImmediate(id);
    }
    WebTimer.clearTimeout = clearTimeout;
})(WebTimer || (WebTimer = {}));
export default WebTimer;
//# sourceMappingURL=web-timer.js.map