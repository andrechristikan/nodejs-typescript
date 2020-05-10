type store = {
    firstName: string;
    lastName?: string;
    userName: string;
    email: string;
    password: string;
    gender: number;
}

type getOne = {
    userName: string;
    email: string;
}

type getOneById = {
    id: string;
}

type getAll = {
    firstName?: string;
    lastName?: string;
    userName?: string;
    email?: string;
    gender?: number;
}