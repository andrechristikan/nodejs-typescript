class Version {
    public getVersion(): string {
        return `v${config('core.version')}`;
    }
}

export default Version;
export const { getVersion } = new Version();
