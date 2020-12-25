export namespace WebTimer {
    export type GlobalTimeout = ReturnType<typeof global.setTimeout>;
    export type GlobalImmediate = ReturnType<typeof global.setImmediate>;
    export type TimerId = GlobalTimeout | GlobalImmediate;

    export function setTimeout(cb: () => void, ms: number): [number, TimerId] {
        if (ms) return [ms, global.setTimeout(cb, ms)];
        else return [ms, global.setImmediate(cb)];
    }

    export function clearTimeout(
        [ms, id]: [number, TimerId],
    ) {
        if (ms) global.clearTimeout(<GlobalTimeout>id);
        else global.clearImmediate(<GlobalImmediate>id);
    }

}

export default WebTimer;
