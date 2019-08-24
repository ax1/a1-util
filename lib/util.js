"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("util");
const child_process_1 = require("child_process");
const execPromise = util_1.promisify(child_process_1.exec);
/**
 * Generic call to an external process (ie: calling an executable file).
 * Use with CAUTION. Check or sanitize the input (otherwise someone could perform rogue commands by adding data to the expected input string ).
 * If stderr but exit was 0, the response is treated as Error
 * Detached mode is automatically detected, but the stdout is lost as well. Example `sleep 10 &`
 * @param {string} command The instruction typed in the same way as typed in a terminal window. Examples: "ls -la | grep node" or "cat file.txt"
 */
async function execute(command) {
    const unref = command.endsWith('&'); // 'detached' symbol in command is not handle by node/libuv, use unref()
    if (unref) {
        child_process_1.exec(command).unref();
        return '';
    }
    else {
        const { stdout, stderr } = await execPromise(command);
        if (stderr.toString())
            throw new Error(stderr.toString());
        return stdout.toString();
    }
}
exports.execute = execute;
async function sleep(millis) {
    return new Promise(resolve => setTimeout(resolve, millis));
}
exports.sleep = sleep;
function log(type, message) {
    const t = type.toLowerCase ? type.toLowerCase() : '';
    const prefix = t == 'ok' ? '\x1b[32m%s\x1b[0m' : t == 'error' ? '\x1b[31m%s\x1b[0m' : '';
    console.log(prefix, message);
}
exports.log = log;
/**
 * @deprecated
 */
function logOK(message) {
    console.log('\x1b[32m%s\x1b[0m', message);
}
exports.logOK = logOK;
/**
 * @deprecated
 */
function logError(message) {
    console.log('\x1b[31m%s\x1b[0m', message);
}
exports.logError = logError;
