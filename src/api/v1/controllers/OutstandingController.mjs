import numeral from "numeral";
import LoanService from "../services/LoanService";

class LoanController {
  static graSewa = async (req, res, next) => {
    let { outstanding } = new LoanService();
    let promise = outstanding("GraSewa");

    promise
      .then((result) => {
        let allOutstandingNumberWithoutInterest = numeral(
          result.allOutstandingNumberWithoutInterest
        ).format("0,0.00");
        let allLoanAmountWithoutInterest = numeral(
          result.allLoanAmountWithoutInterest
        ).format("0,0.00");
        let message = trans("loan.report.outstanding.amount")
          .replace("#amount", allLoanAmountWithoutInterest)
          .replace("#outstandingAmount", allOutstandingNumberWithoutInterest)
          .replace("#productType", "GraSewa");
        let json = structure.success(message, result);
        res.status(200).json(json);
      })
      .catch((err) => {
        let json = structure.error(trans("app.internal_server_error"));
        res.status(500).json(json);
      });
  };

  static graDP = async (req, res, next) => {
    let { outstanding } = new LoanService();
    let promise = outstanding("GraDP");

    promise
      .then((result) => {
        let allOutstandingNumberWithoutInterest = numeral(
          result.allOutstandingNumberWithoutInterest
        ).format("0,0.00");
        let allLoanAmountWithoutInterest = numeral(
          result.allLoanAmountWithoutInterest
        ).format("0,0.00");
        let message = trans("loan.report.outstanding.amount")
          .replace("#amount", allLoanAmountWithoutInterest)
          .replace("#outstandingAmount", allOutstandingNumberWithoutInterest)
          .replace("#productType", "GraDP");
        let json = structure.success(message, result);
        res.status(200).json(json);
      })
      .catch((err) => {
        let json = structure.error(trans("app.internal_server_error"));
        res.status(500).json(json);
      });
  };

  static graKarya = async (req, res, next) => {
    let { outstanding } = new LoanService();
    let promise = outstanding("GraKarya");

    promise
      .then((result) => {
        let allOutstandingNumberWithoutInterest = numeral(
          result.allOutstandingNumberWithoutInterest
        ).format("0,0.00");
        let allLoanAmountWithoutInterest = numeral(
          result.allLoanAmountWithoutInterest
        ).format("0,0.00");
        let message = trans("loan.report.outstanding.amount")
          .replace("#amount", allLoanAmountWithoutInterest)
          .replace("#outstandingAmount", allOutstandingNumberWithoutInterest)
          .replace("#productType", "GraKarya");
        let json = structure.success(message, result);
        res.status(200).json(json);
      })
      .catch((err) => {
        let json = structure.error(trans("app.internal_server_error"));
        res.status(500).json(json);
      });
  };

  static graStrata = async (req, res, next) => {
    let { outstanding } = new LoanService();
    let promise = outstanding("GraStrata");

    promise
      .then((result) => {
        let allOutstandingNumberWithoutInterest = numeral(
          result.allOutstandingNumberWithoutInterest
        ).format("0,0.00");
        let allLoanAmountWithoutInterest = numeral(
          result.allLoanAmountWithoutInterest
        ).format("0,0.00");
        let message = trans("loan.report.outstanding.amount")
          .replace("#amount", allLoanAmountWithoutInterest)
          .replace("#outstandingAmount", allOutstandingNumberWithoutInterest)
          .replace("#productType", "GraStrata");
        let json = structure.success(message, result);
        res.status(200).json(json);
      })
      .catch((err) => {
        let json = structure.error(trans("app.internal_server_error"));
        res.status(500).json(json);
      });
  };

  static all = async (req, res, next) => {
    let { outstandingAll } = new LoanService();
    let promise = outstandingAll();

    promise
      .then((data) => {
        let allOutstandingNumberWithoutInterest = numeral(
          data.allOutstandingNumberWithoutInterest
        ).format("0,0.00");
        let allLoanAmountWithoutInterest = numeral(
          data.allLoanAmountWithoutInterest
        ).format("0,0.00");

        let message = trans("loan.report.outstanding.amount")
          .replace("#amount", allLoanAmountWithoutInterest)
          .replace("#outstandingAmount", allOutstandingNumberWithoutInterest)
          .replace("#productType", "All Product");
        let json = structure.success(message, data);
        res.status(200).json(json);
      })
      .catch((err) => {
        let json = structure.error(trans("app.internal_server_error"));
        res.status(500).json(json);
      });
  };

  static uniqueBorrower = async (req, res, next) => {
    let { outstandingUniqueBorrower } = new LoanService();
    let promise = outstandingUniqueBorrower();

    promise
      .then((data) => {
        let json = structure.success(
          trans("loan.report.outstanding.unique_borrower.count"),
          data
        );
        res.status(200).json(json);
      })
      .catch((err) => {
        let json = structure.error(trans("app.internal_server_error"));
        res.status(500).json(json);
      });
  };

  static uniqueBorrowerWithMonthAndYear = async (req, res, next) => {
    let { uniqueBorrowerWithMonthAndYear } = new LoanService();
    let promise = uniqueBorrowerWithMonthAndYear(
      parseInt(req.params.month),
      parseInt(req.params.year)
    );

    promise
      .then((data) => {
        let json = structure.success(
          trans("loan.report.outstanding.unique_borrower.count"),
          data
        );
        res.status(200).json(json);
      })
      .catch((err) => {
        let json = structure.error(trans("app.internal_server_error"));
        res.status(500).json(json);
      });
  };

  static province = async (req, res, next) => {
    let { outstandingProvince } = new LoanService();
    let promise = outstandingProvince();

    promise
      .then((data) => {
        let json = structure.success(
          trans("loan.report.outstanding.province.count"),
          data
        );
        res.status(200).json(json);
      })
      .catch((err) => {
        let json = structure.error(trans("app.internal_server_error"));
        res.status(500).json(json);
      });
  };

  static provinceWithMonthAndYear = async (req, res, next) => {
    let { outstandingProvinceWithMonthAndYear } = new LoanService();
    let promise = outstandingProvinceWithMonthAndYear(
      parseInt(req.params.month),
      parseInt(req.params.year)
    );

    promise
      .then((data) => {
        let json = structure.success(
          trans("loan.report.outstanding.province.count"),
          data
        );
        res.status(200).json(json);
      })
      .catch((err) => {
        let json = structure.error(trans("app.internal_server_error"));
        res.status(500).json(json);
      });
  };

  static age = async (req, res, next) => {
    let { outstandingAgeAll } = new LoanService();
    let promise = outstandingAgeAll();

    promise
      .then((data) => {
        let json = structure.success(
          trans("loan.report.outstanding.age.count"),
          data
        );
        res.status(200).json(json);
      })
      .catch((err) => {
        let json = structure.error(trans("app.internal_server_error"));
        res.status(500).json(json);
      });
  };

  static ageWithMonthAndYear = async (req, res, next) => {
    let { outstandingAgeWithMonthAndYearAll } = new LoanService();
    let promise = outstandingAgeWithMonthAndYearAll(
      parseInt(req.params.month),
      parseInt(req.params.year)
    );

    promise
      .then((data) => {
        let json = structure.success(
          trans("loan.report.outstanding.age.count"),
          data
        );
        res.status(200).json(json);
      })
      .catch((err) => {
        let json = structure.error(trans("app.internal_server_error"));
        res.status(500).json(json);
      });
  };
}

export default LoanController;
