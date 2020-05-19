type storeUser = {
    firstName: string;
    lastName?: string;
    userName: string;
    email: string;
    password: string;
    gender: number;
}

type updateUser = {
    firstName?: string;
    lastName?: string;
    userName?: string;
    email?: string;
    password?: string;
    gender?: number;
}

type getOneUser = {
    firstName?: string;
    lastName?: string;
    userName?: string;
    email?: string;
    gender?: number;
}

type getAllUserExist = {
    userName: string;
    email: string;
}

type getAllUser = {
    firstName?: string;
    lastName?: string;
    userName?: string;
    email?: string;
    gender?: number;
}

type storeUserService = (data: storeUser) => Promise<response>;

type updateUserService = (id: string, data: updateUser) => Promise<response>;

type getOneUserService = (data: getOneUser) => Promise<response>;

type getAllUserExistService = (data: getAllUserExist, id?: string) => Promise<response>;

type getOneUserByIdService = (id: string) => Promise<response>;

type getAllUserService = (data: getAllUser) => Promise<response>;

type comparePasswordFunction = (candidatePassword: string, callback: (err: any, isMatch: any) => {}) => void;
