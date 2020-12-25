# interruptible-timer

就是一个可以取消的倒计时器。

既然已经有了 Bluebird Cancellation 还要写这个工具是为了

- 要自定义 SetTimeout。
- 要避免 nodejs 中 setTimeout 0 ms 时自动改成 1 毫秒而不是等效于 setImmediate。

    https://nodejs.org/dist/latest-v14.x/docs/api/timers.html#timers_settimeout_callback_delay_args
