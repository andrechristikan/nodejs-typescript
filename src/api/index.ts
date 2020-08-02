import Version1 from './v1';

class VersioningClass{
    constructor () {
        const version1 = new Version1();
        const versioning: versioning = {
            v1 : version1.get()
        }
        return versioning;
    }

}

const versioning: versioning = new VersioningClass() as versioning;
export default versioning;