/** Makes a string harder to read. */

declare function env(key: string): string;

declare function config(key: string): any;

declare function trans(key: string): string;

declare function getVersion(): string;

declare function getError(): string;

declare class APIError {
    constructor(code: number, description: string, data?: any);
}

declare const logger: any;

type log = {
    rules: {
        path: string,
        size: string,
        maxSize: string,
        compress: boolean,
        interval: string,
    },
    name: string,
    routes: Array<string>,
    includes: Array<string>,
};
