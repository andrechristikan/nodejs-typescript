import countryModel from '../country/CountryModel';
import { CountryInterface } from './CountyInterface';

class CountryService {
    public getById = async (id: string): Promise<CountryInterface> => {
        return new Promise((resolve, reject) => {
            countryModel
                .findById(id)
                .exec((err: any, country: CountryInterface) => {
                    if (err) {
                        reject(err);
                    }
                    resolve(country);
                });
        });
    };
}

export default CountryService;
export const { getById } = new CountryService();
