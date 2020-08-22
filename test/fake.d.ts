interface Callback {
    (): void;
    args: ArrayLike<unknown>[];
}
declare function fake(): Callback;

export default fake;