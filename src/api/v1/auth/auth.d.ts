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
};

type userResponse = {
    fullName: string;
    email: string;
};

type tokenGenerate = {
    token: string;
    expiresIn: string;
};
