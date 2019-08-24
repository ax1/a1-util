import { promisify } from 'util'
import { exec } from 'child_process'
const execPromise = promisify(exec)

/**
 * Generic call to an external process (ie: calling an executable file).
 * Use with CAUTION. Check or sanitize the input (otherwise someone could perform rogue commands by adding data to the expected input string ).
 * If stderr but exit was 0, the response is treated as Error
 * Detached mode is automatically detected, but the stdout is lost as well. Example `sleep 10 &`
 * @param {string} command The instruction typed in the same way as typed in a terminal window. Examples: "ls -la | grep node" or "cat file.txt"  
 */
export async function execute(command: string): Promise<string> {
  const unref = command.endsWith('&') // 'detached' symbol in command is not handle by node/libuv, use unref()
  if (unref) {
    exec(command).unref()
    return ''
  } else {
    const { stdout, stderr } = await execPromise(command)
    if (stderr.toString()) throw new Error(stderr.toString())
    return stdout.toString()
  }
}

export async function sleep(millis: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, millis))
}

export function log(type: string, message?: any): void {
  const t = type.toLowerCase ? type.toLowerCase() : ''
  const prefix = t == 'ok' ? '\x1b[32m%s\x1b[0m' : t == 'error' ? '\x1b[31m%s\x1b[0m' : ''
  console.log(prefix, message)
}

/**
 * @deprecated
 */
export function logOK(message?: any): void {
  console.log('\x1b[32m%s\x1b[0m', message)
}

/**
 * @deprecated
 */
export function logError(message?: any): void {
  console.log('\x1b[31m%s\x1b[0m', message)
}
