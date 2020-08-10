type signUp = {
    password: string;
    firstName: string;
    lastName: string;
    email: string;
    mobileNumber: string;
    country: string;
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
    mobileNumberCode: string;
    countryCode: string;
};
