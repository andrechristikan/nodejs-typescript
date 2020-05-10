/** Makes a string harder to read. */
declare function env(key: string): string;

declare function config(key: string): string | any;

declare function trans(key: string): string;

declare const logger: any;

declare function responseStructureSuccess(message: string, data?: any): response;

declare function responseStructureError(message: string, data?: any): response;
