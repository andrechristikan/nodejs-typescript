class VersionClass {
    protected middleware: any;
    protected errors: any;
    protected router: defaultRoute[];
    protected controllers: any;
    protected languages: object;

    public get = (): baseVersioning => {
        this.setMiddleware();
        this.setErrors();
        this.setRouter();
        this.setControllers();
        this.setLanguages();

        const setVersion: baseVersioning = {
            router: this.router,
            middleware: this.middleware,
            controllers: this.controllers,
            languages: this.languages,
            errors: this.errors,
        };
        return setVersion;
    };

    protected setMiddleware = (): void => {};

    protected setErrors = (): void => {};

    protected setRouter = (): void => {};

    protected setControllers = (): void => {};

    protected setLanguages = (): void => {};
}
export default VersionClass;
