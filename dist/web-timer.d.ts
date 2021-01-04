/// <reference types="node" />
export declare namespace WebTimer {
    type GlobalTimeout = ReturnType<typeof globalThis.setTimeout>;
    type GlobalImmediate = ReturnType<typeof globalThis.setImmediate>;
    type TimerId = GlobalTimeout | GlobalImmediate;
    function setTimeout(cb: () => void, ms: number): [number, TimerId];
    function clearTimeout([ms, id]: [number, TimerId]): void;
}
export default WebTimer;
