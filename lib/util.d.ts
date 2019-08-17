/**
 * Generic call to an external process (ie: calling an executable file).
 * Use with CAUTION. Check or sanitize the input (otherwise someone could perform rogue commands by adding data to the expected input string ).
 * If stderr but exit was 0, the response is treated as Error
 * @param {Promise<string>} command The instruction typed in the same way as typed in a terminal window. Examples: "ls -la | grep node" or "cat file.txt"
 */
export declare function execute(command: string): Promise<string>;
export declare function sleep(millis: number): Promise<void>;
export declare function log(type: string, message?: any): void;
/**
 * @deprecated
 */
export declare function logOK(message?: any): void;
/**
 * @deprecated
 */
export declare function logError(message?: any): void;
