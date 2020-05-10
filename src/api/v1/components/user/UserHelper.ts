export const searchParams = (data: getAll): object => {
    const search: getAll = {};

    if(data.firstName){
        search.firstName = data.firstName;
    }
    if(data.lastName){
        search.lastName = data.lastName;
    }
    if(data.userName){
        search.userName = data.userName;
    }
    if(data.email){
        search.email = data.email;
    }
    if(data.gender){
        search.gender = data.gender;
    }

    return search;
};
