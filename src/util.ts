import { promisify } from 'util'
import { exec, spawn } from 'child_process'
const execPromise = promisify(exec)
import { fileURLToPath, URL } from 'url'

type executeOptions = {
  /** detach COMPLETELY by:1-new independent process, 2-stdout stderr are also different than the parent*/
  unref?: boolean
}
/**
 * See https://bashitout.com/2013/05/18/Ampersands-on-the-command-line.html
 * Generic call to an external process (ie: calling an executable file).
 * Use with CAUTION. Check or sanitize the input (otherwise someone could perform rogue commands by adding data to the expected input string ).
 * If stderr but exit was 0, the response is treated as Error
 * Detached mode is automatically detected, but the stdout is lost as well. Example `sleep 10 &`
 * @param {string} command The instruction typed in the same way as typed in a terminal window. Examples: "ls -la | grep node" or "cat file.txt"
 * @param {executeOptions} options  unref: makes stdio and process to be independent completely  
 */
export async function execute(command: string, options?: executeOptions): Promise<string> {
  const detach = command.endsWith('&') // 'detached' symbol in command is not handle by node/libuv, use unref()
  if (options && options.unref) exec(command).unref() // start and forget. The app can crash and the process would continue to live
  else if (detach) spawn(command, { stdio: 'inherit', shell: true }) //'stdio' to pipe to parent (so logs are shown in journalctl), 'shell' to allow command parameters
  else {
    const { stdout, stderr } = await execPromise(command)
    if (stderr.toString()) throw new Error(stderr.toString())
    return stdout.toString()
  }
  return '0'
}

/**
 * Async sleep. This function will be deprecad in the future 
 * because it can be performed by timers.timeout() added in V15 https://nodejs.org/api/timers.html#timers_timers_promises_api
 * @param millis 
 * @returns 
 */
export async function sleep(millis: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, millis))
}

/**
 * ESM replacement for __dirname.
 * When using bundlers, the dirname can be a .js file, so this function also patches it.* 
 * @returns {string}
 */
export function dirname() {
  let __dirname = fileURLToPath(new URL('.', import.meta.url))
  if (__dirname.endsWith('.js')) __dirname = __dirname.substring(0, __dirname.lastIndexOf('/') + 1)
  return dirname
}

export function log(type: string, message?: any): void {
  const t = (type && type.toLowerCase) ? type.toLowerCase() : ''
  const prefix = (t == 'ok' || t == 'info') ? '\x1b[32m%s\x1b[0m' : t == 'error' ? '\x1b[31m%s\x1b[0m' : ''
  console.log(prefix, message)
}

export function printMatrix(matrix: Array<Array<any>>) {
  return matrix.map(row => row.toString()).reduce((acc, el) => acc + '\n' + el)
}

/**
 * @deprecated
 * Use log(type, msg) instead
 */
export function logOK(message?: any): void {
  console.log('\x1b[32m%s\x1b[0m', message)
}

/**
 * @deprecated
 * Use log(type, msg) instead
 */
export function logError(message?: any): void {
  console.log('\x1b[31m%s\x1b[0m', message)
}
