# a1-util

Set of handy, specialized functions, to avoid repeating tasks but also to avoid having a ton of tiny one-line separate modules.

The library is intended to be kept as small as possible for ever. This is not a generic utilities library. Pick a popular one for those tasks.

## API

> See util.js for in-depth documentation

- **execute(command, options?):** execute a command like as in the terminal but 1-returns promise and 2-stderr is treated as exception (and therefore, thrown). If the command is detached (`./myProcess &`), the execution runs in parallel but the stdio pipes are the same as te app. This is useful when the app is running as a process, and logs int the secondary app are automatically logged in the parent app. Also, if the parent app is stopped, the detached processes will also be stopped (no orphane processes).  Options, only for advanced features. `unref = true` when the process will start as completely separated process with its own stdio and it will keep running even if the parent process stops. 

- **sleep(millis):** non-blocking delay in milliseconds.

- **log(type, message):** pretty-print logs with a unicode colored symbol as prefix. Types ['ok', 'error'].