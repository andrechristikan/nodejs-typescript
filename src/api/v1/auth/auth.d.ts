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
    firstName: string;
    lastName: string;
    email: string;
    mobileNumber: string;
    country: {
        mobileNumberCode: string;
        countryCode: string;
        countryName: string;
    }

};

type tokenGenerate = {
    token: string,
    expiresIn: string
}