type storeUser = {
    name: {
        first: string;
        last?: string;
    };
    mobileNumber: string;
    password: string;
    email: string;

    open_account_reason: string;
    source_of_fund: string;
    religion: string;
    job_code: string;
    address_rt_rw_perum: string;
    home_phone_number: string;
    office_phone_number: string;
    fax_number: string;
}

type updateUser = {
    name?: {
        first: string;
        last: string;
    };
    mobileNumber?: string;
    password?: string;
    email?: string;

    open_account_reason?: string;
    source_of_fund?: string;
    religion?: string;
    job_code?: string;
    address_rt_rw_perum?: string;
    home_phone_number?: string;
    office_phone_number?: string;
    fax_number?: string;
}

type getOneUser = {
    mobileNumber?: string;
    email?: string;
}

type getAllUserExist = {
    mobileNumber?: string;
    email?: string;
}

type getAllUser = {
    name?: {
        first: string;
        last: string;
    };
    mobileNumber?: string;
    email?: string;
}

type storeUserService = (data: storeUser) => Promise<responseStructure>;

type updateUserService = (id: string, data: updateUser) => Promise<responseStructure>;

type getOneUserService = (data: getOneUser) => Promise<responseStructure>;

type getAllUserExistService = (data: getAllUserExist, id?: string) => Promise<responseStructure>;

type getOneUserByIdService = (id: string) => Promise<responseStructure>;

type getAllUserService = (data: getAllUser, page: number, limit: number) => Promise<responseStructure>;

type comparePasswordFunction = (candidatePassword: string, callback: (err: any, isMatch: any) => {}) => void;
