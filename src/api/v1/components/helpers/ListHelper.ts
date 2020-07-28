class ListHelper {
    public getTotalPage = (count: number) => {
        const limit: number = config('up.limitList');
        let totalPage = 0;
        if (count > 0) {
            totalPage = Math.ceil(count / limit);
        }

        return totalPage;
    };

    public getSkip = (page: number) => {
        const skip: number = page ? (page - 1) * config('up.limitList') : 0;
        return skip;
    };

    public getLimit = (limit: number) => {
        return limit || config('up.limitList');
    };
}

export const { getTotalPage, getSkip, getLimit } = new ListHelper();
export default ListHelper;
