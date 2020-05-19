type response = {
    status: number,
    message: string,
    data? : any
}

type responseList = {
    status: number,
    message: string,
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
