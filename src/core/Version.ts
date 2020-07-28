
class Version{
    public getVersion = (): string => {
        return `v${env('VERSION')}`;
    }
}

export default Version;
export const { getVersion } = new Version();