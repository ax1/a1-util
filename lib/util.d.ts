declare type executeOptions = {
    /** detach COMPLETELY by:1-new independent process, 2-stdout stderr are also different than the parent*/
    unref?: boolean;
};
/**
 * See https://bashitout.com/2013/05/18/Ampersands-on-the-command-line.html
 * Generic call to an external process (ie: calling an executable file).
 * Use with CAUTION. Check or sanitize the input (otherwise someone could perform rogue commands by adding data to the expected input string ).
 * If stderr but exit was 0, the response is treated as Error
 * Detached mode is automatically detected, but the stdout is lost as well. Example `sleep 10 &`
 * @param {string} command The instruction typed in the same way as typed in a terminal window. Examples: "ls -la | grep node" or "cat file.txt"
 * @param {executeOptions} options  unref: makes stdio and process to be independent completely
 */
export declare function execute(command: string, options?: executeOptions): Promise<string>;
export declare function sleep(millis: number): Promise<void>;
export declare function log(type: string, message?: any): void;
export declare function printMatrix(matrix: Array<Array<any>>): string;
/**
 * @deprecated
 */
export declare function logOK(message?: any): void;
/**
 * @deprecated
 */
export declare function logError(message?: any): void;
export {};
