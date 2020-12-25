export declare namespace WebTimer {
    type GlobalTimeout = ReturnType<typeof global.setTimeout>;
    type GlobalImmediate = ReturnType<typeof global.setImmediate>;
    type TimerId = GlobalTimeout | GlobalImmediate;
    function setTimeout(cb: () => void, ms: number): [number, TimerId];
    function clearTimeout([ms, id]: [number, TimerId]): void;
}
export default WebTimer;
