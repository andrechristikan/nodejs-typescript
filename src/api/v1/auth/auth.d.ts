type signUp = {
    country: string;
    password: string;
    firstName: string;
    lastName: string;
    email: string;
    mobileNumber: string;
};

type login = {
    email: string;
    password: string;
};

type dataToken = {
    id: string;
    email: string;
    mobileNumber?: string;
};

type userResponse = {
    fullName: string;
    email: string;
};

type tokenGenerate = {
    token: string;
    expiresIn: string;
};

type optionGenerateToken = {
    audience?: string | Array<string>;
    algorithm: string;
    expiresIn: string;
    issuer: string;
};

type optionVerifyToken = {
    audience?: string | Array<string>;
    algorithm: string;
    issuer: string;
};