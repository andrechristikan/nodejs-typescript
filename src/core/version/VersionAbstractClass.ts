
abstract class VersionAbstractClass {
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

    protected abstract setMiddleware(): void ;

    protected abstract setErrors(): void;

    protected abstract setRouter(): void;

    protected abstract setControllers(): void;

    protected abstract setLanguages(): void;
}
export default VersionAbstractClass;
