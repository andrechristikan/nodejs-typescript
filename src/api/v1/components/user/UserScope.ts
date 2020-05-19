import { Types } from 'mongoose'; 

export const scopeUserExist = (data: getAllUserExist): object => {
    return {
        $or:[
            {email: data.email},
            {userName: data.userName}
        ]
    };
};

export const scopeUserExistIgnoreSpecific = (data: getAllUserExist, id: string): object => {
    console.log( new Types.ObjectId('5eb99fdaf4a36738b522e56e'));
    console.log( Types.ObjectId('578df3efb618f5141202a196') );
    console.log( new Types.ObjectId('578df3efb618f5141202a196') );
    return {
        $or:[
            {email: data.email},
            {userName: data.userName}
        ],
        _id: {$ne: Types.ObjectId(id)}
    };
};
