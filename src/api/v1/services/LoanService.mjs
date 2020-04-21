import * as loan from "../models/loan";
import { model } from "../models/loan";
import outstandingHelper from "../helpers/loan/outstanding";

class LoanService {
  constructor() {}

  outstanding = async (product_type) => {
    return new Promise((resolve, reject) => {
      try {
        model
          .aggregate(loan.scopeOutStandingWithProductType(product_type))
          .exec((err, result) => {
            if (err) {
              reject(err);
            }

            resolve(result);
          });
      } catch (err) {
        reject(err);
      }
    }).then((loans) => {
      if (product_type == "GraDP") {
        return outstandingHelper.graDP(loans);
      } else if (product_type == "GraKarya") {
        return outstandingHelper.graKarya(loans);
      } else if (product_type == "GraStrata") {
        return outstandingHelper.graStrata(loans);
      }
      return outstandingHelper.graSewa(loans);
    });
  };

  outstandingAll = async () => {
    return Promise.all([
      await this.outstanding("GraSewa"),
      await this.outstanding("GraDP"),
      await this.outstanding("GraKarya"),
      await this.outstanding("GraStrata"),
    ]).then(([graSewa, graDP, graKarya, graStrata]) => {
      let data = outstandingHelper.all(graSewa, graDP, graKarya, graStrata);
      return data;
    });
  };

  outstandingUniqueBorrower = async () => {
    return new Promise((resolve, reject) => {
      try {
        model
          .aggregate(loan.scopeOutStandingUniqueBorrower())
          .exec((err, result) => {
            if (err) {
              reject(err);
            }

            resolve(result);
          });
      } catch (err) {
        reject(err);
      }
    }).then((loans) => {
      let data = outstandingHelper.uniqueBorrower(loans);
      return data;
    });
  };

  uniqueBorrowerWithMonthAndYear = async (month, year) => {
    return new Promise((resolve, reject) => {
      try {
        model
          .aggregate(
            loan.scopeOutStandingUniqueBorrowerWithMonthAndYear(month, year)
          )
          .exec((err, result) => {
            if (err) {
              reject(err);
            }

            resolve(result);
          });
      } catch (err) {
        reject(err);
      }
    }).then((loans) => {
      let data = outstandingHelper.uniqueBorrower(loans);
      return data;
    });
  };

  outstandingProvince = async () => {
    return new Promise((resolve, reject) => {
      try {
        model.aggregate(loan.scopeOutStandingProvince()).exec((err, result) => {
          if (err) {
            reject(err);
          }

          resolve(result);
        });
      } catch (err) {
        reject(err);
      }
    }).then((loans) => {
      let data = outstandingHelper.province(loans);
      return data;
    });
  };

  outstandingProvinceWithMonthAndYear = async (month, year) => {
    return new Promise((resolve, reject) => {
      try {
        model
          .aggregate(loan.scopeOutStandingProvinceWithMonthAndYear(month, year))
          .exec((err, result) => {
            if (err) {
              reject(err);
            }

            resolve(result);
          });
      } catch (err) {
        reject(err);
      }
    }).then((loans) => {
      let data = outstandingHelper.province(loans);
      return data;
    });
  };

  outstandingAge = async (start, end) => {
    return new Promise((resolve, reject) => {
      try {
        model
          .aggregate(loan.scopeOutstandingAge(start, end))
          .exec((err, result) => {
            if (err) {
              reject(err);
            }

            resolve(result);
          });
      } catch (err) {
        reject(err);
      }
    }).then((loans) => {
      let data = outstandingHelper.age(loans, start, end);
      return data;
    });
  };

  outstandingAgeAll = async () => {
    let promiseAgeOne = await this.outstandingAge(-1, 19);
    let promiseAgeTwo = await this.outstandingAge(19, 35);
    let promiseAgeThree = await this.outstandingAge(35, 55);
    let promiseAgeFour = await this.outstandingAge(55, 1000);

    let promise = Promise.all([
      promiseAgeOne,
      promiseAgeTwo,
      promiseAgeThree,
      promiseAgeFour,
    ]).then(([ageOne, ageTwo, ageThree, ageFour]) => {
      let details = [];
      details.push(ageOne);
      details.push(ageTwo);
      details.push(ageThree);
      details.push(ageFour);

      let data = {
        allOutstandingNumberWithoutInterest:
          ageOne.allOutstandingNumberWithoutInterest +
          ageTwo.allOutstandingNumberWithoutInterest +
          ageThree.allOutstandingNumberWithoutInterest +
          ageFour.allOutstandingNumberWithoutInterest,
        countLoan:
          ageOne.countLoan +
          ageTwo.countLoan +
          ageThree.countLoan +
          ageFour.countLoan,
        details: details,
      };

      return data;
    });

    return promise;
  };

  outstandingAgeWithMonthAndYear = async (start, end, month, year) => {
    return new Promise((resolve, reject) => {
      try {
        model
          .aggregate(
            loan.scopeOutstandingAgeWithMonthAndYear(start, end, month, year)
          )
          .exec((err, result) => {
            if (err) {
              reject(err);
            }

            resolve(result);
          });
      } catch (err) {
        reject(err);
      }
    }).then((loans) => {
      let data = outstandingHelper.age(loans, start, end);
      return data;
    });
  };

  outstandingAgeWithMonthAndYearAll = async (month, year) => {
    let promiseAgeOne = await this.outstandingAgeWithMonthAndYear(
      -1,
      19,
      month,
      year
    );
    let promiseAgeTwo = await this.outstandingAgeWithMonthAndYear(
      19,
      35,
      month,
      year
    );
    let promiseAgeThree = await this.outstandingAgeWithMonthAndYear(
      35,
      55,
      month,
      year
    );
    let promiseAgeFour = await this.outstandingAgeWithMonthAndYear(
      55,
      1000,
      month,
      year
    );
    let promise = Promise.all([
      promiseAgeOne,
      promiseAgeTwo,
      promiseAgeThree,
      promiseAgeFour,
    ]);

    promise.then(([ageOne, ageTwo, ageThree, ageFour]) => {
      let details = [];
      details.push(ageOne);
      details.push(ageTwo);
      details.push(ageThree);
      details.push(ageFour);

      let data = {
        allOutstandingNumberWithoutInterest:
          ageOne.allOutstandingNumberWithoutInterest +
          ageTwo.allOutstandingNumberWithoutInterest +
          ageThree.allOutstandingNumberWithoutInterest +
          ageFour.allOutstandingNumberWithoutInterest,
        countLoan:
          ageOne.countLoan +
          ageTwo.countLoan +
          ageThree.countLoan +
          ageFour.countLoan,
        details: details,
      };

      return data;
    });

    return promise;
  };
}

export default LoanService;
