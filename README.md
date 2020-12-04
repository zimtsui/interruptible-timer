# interruptible-timer

就是一个可以取消的倒计时器。

之所以不直接用 Bluebird Cancellation 是因为要自定义 SetTimeout。
