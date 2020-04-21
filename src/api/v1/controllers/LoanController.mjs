import numeral from "numeral";
import LoanService from "../services/LoanService";

class LoanController {
  static outstandingGraSewa = async (req, res, next) => {
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
}

export default LoanController;
