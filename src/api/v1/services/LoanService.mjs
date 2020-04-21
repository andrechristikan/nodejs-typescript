import * as loan from "../models/loan";
import { model } from "../models/loan";
import outstandingHelper from "../helpers/loan/outstanding";

class LoanService {
  constructor() {}

  outstanding = async (product_type) => {
    let promise = new Promise((resolve, reject) => {
      try {
        model.aggregate(
          loan.scopeOutStandingWithProductType(product_type)
        ).exec((err, result) => {
          if (err) {
            reject(err.errmsg);
          }

          resolve(result);
        });
      } catch (err) {
        reject(err.errmsg);
      }
    }).then((loans) => {
      if (product_type == "GraDP") {
        return outstandingHelper.graDPCalculate(loans);
      } else if (product_type == "GraKarya") {
        return outstandingHelper.graKaryaCalculate(loans);
      } else if (product_type == "GraStrata") {
        return outstandingHelper.graStrataCalculate(loans);
      }
      return outstandingHelper.graSewaCalculate(loans);
    });

    return promise;
  };
}

export default LoanService;
