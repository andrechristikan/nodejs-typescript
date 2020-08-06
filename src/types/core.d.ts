/** Makes a string harder to read. */

declare function env(key: string): string;

declare function config(key: string): any;

declare function language(key: string): string;

declare function getVersion(): string;

declare function getError(): string;

declare const Enum: Enum;

type defaultRoute = {
    prefix: string;
    routes?: baseRoute[];
    middleware?: string;
};

type baseRoute = {
    controller: string;
    url: string;
    method: string;
    middleware?: string;
};

type baseVersioning = {
    router: defaultRoute[];
    middleware: any;
    controllers: any;
    languages: object;
    errors: any;
};

type versioning = {
    [key: string]: baseVersioning;
};

type languages = {
    [key: string]: any;
};
