/** Makes a string harder to read. */
declare function env(key: string): string;

declare function config(key: string): string | any;

declare function trans(key: string): string;

declare const logger: any;

declare function responseSuccess(message: string, data?: any): responseStructure;

declare function responseList(message: string, count: number, data: any, page?: number): responseListStructure;

declare function responseError(message: string, data?: any): responseStructure;

type responseStructure = {
    status: number,
    message: string,
    data? : any
}

type responseListStructure = {
    status: number,
    message: string,
    page?: number,
    count: number,
    totalPage: number,
    data? : any
}

type log = {
    rules: {
        path: string,
        size: string,
        maxSize: string,
        compress: boolean,
        interval: string,
    },
    name: string
    routes: Array<string>,
    includes: Array<string>,
}
