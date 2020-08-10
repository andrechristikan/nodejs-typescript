import countryModel from '../country/CountryModel';
import { CountryBaseInterface } from './CountyInterface';

class CountryService {
    public async getById(id: string): Promise<CountryBaseInterface> {
        return new Promise((resolve, reject) => {
            countryModel
                .findById(id)
                .exec((err: any, country: CountryBaseInterface) => {
                    if (err) {
                        reject(err);
                    }
                    resolve(country);
                });
        });
    }
}

export default CountryService;
export const { getById } = new CountryService();
