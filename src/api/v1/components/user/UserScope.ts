
class UserScope{
    public userExist = (query: any, mobileNumber?: string, email?: string): any => {
        
        if(mobileNumber){
            query = query.where('mobileNumber').equals(mobileNumber);
        }

        if(email){
            query = query.where('email').equals(email);
        }
        
        return query;
    }

    public userExistIgnoreId = (query: any, id: string, mobileNumber?: string, email?: string): any => {

        if(mobileNumber){
            query = query.where('mobileNumber').equals(mobileNumber);
        }

        if(email){
            query = query.where('email').equals(email);
        }
        
        return query.where('_id').ne(id);
    };

    public userSearchList = (query: any, firstName?: string, lastName?: string, mobileNumber?: string, email?: string) => {
        if(firstName){
            query = query.where('name.first').equals(firstName);
        }

        if(lastName){
            query = query.where('name.last').equals(lastName);
        }

        if(mobileNumber){
            query = query.where('mobileNumber').equals(mobileNumber);
        }

        if(email){
            query = query.where('email').equals(email);
        }

        
        return query;
    }
}

export const { userExist, userExistIgnoreId, userSearchList } = new UserScope();

