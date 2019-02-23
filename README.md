# A1-UTIL

Set of handy, specialized functions, to avoid repeating tasks but also to avoid having a ton of tiny one-line separate modules.

The library is intended to be kept as small as possible for ever. This is not a generic utilities library. Pick a popular one for those tasks.

## API

> See util.js for in-depth documentation

- **execute(command):** execute a command like as in the terminal but 1-returns promise and 2-stderr is treated as exception (and therefore, thrown) 