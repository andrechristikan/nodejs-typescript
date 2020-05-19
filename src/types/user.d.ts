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

type storeUserFunction = (data: storeUser) => Promise<response>;

type updateUserFunction = (id: string, data: updateUser) => Promise<response>;

type getOneUserFunction = (data: getOneUser) => Promise<response>;

type getAllUserExistFunction = (data: getAllUserExist, id?: string) => Promise<response>;

type getOneUserByIdFunction = (id: string) => Promise<response>;

type getAllUserFunction = (data: getAllUser) => Promise<response>;

type comparePasswordFunction = (candidatePassword: string, callback: (err: any, isMatch: any) => {}) => void;
