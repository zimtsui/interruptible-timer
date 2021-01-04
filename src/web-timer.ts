export namespace WebTimer {
    export type GlobalTimeout = ReturnType<typeof globalThis.setTimeout>;
    export type GlobalImmediate = ReturnType<typeof globalThis.setImmediate>;
    export type TimerId = GlobalTimeout | GlobalImmediate;

    export function setTimeout(cb: () => void, ms: number): [number, TimerId] {
        if (ms) return [ms, globalThis.setTimeout(cb, ms)];
        else return [ms, globalThis.setImmediate(cb)];
    }

    export function clearTimeout(
        [ms, id]: [number, TimerId],
    ) {
        if (ms) globalThis.clearTimeout(<GlobalTimeout>id);
        else globalThis.clearImmediate(<GlobalImmediate>id);
    }

}

export default WebTimer;
