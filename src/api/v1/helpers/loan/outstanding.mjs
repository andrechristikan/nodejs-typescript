const graSewaUnpaid = (installmentUnpaid, loan) => {
  return graSewaInstallment(loan, false) * installmentUnpaid.length;
};

const graSewaPartial = (installmentPartial, loan) => {
  let amountPerMonthInstallmentWithoutInterest = graSewaInstallment(
    loan,
    false
  );
  let amount = 0;
  installmentPartial.forEach((value, key, array) => {
    let paidAmount = 0;

    value.payments.forEach((valuePayment, keyPayment, arrayPayment) => {
      paidAmount += valuePayment.amount - valuePayment.trxFee;
    });
    paidAmount = paidAmount - value.installmentFee;
    let result = amountPerMonthInstallmentWithoutInterest - paidAmount;
    amount += result;
  });

  return amount;
};

const graSewaInstallment = (loan, inter) => {
  let tenor = loan.graSewa.tenor ? loan.graSewa.tenor : 0;
  let amountLoan = loan.graSewa.amount ? loan.graSewa.amount : 0;
  let interest = inter ? loan.graSewa.interestPct : 0;

  let amountInstallmentWithoutInterest =
    amountLoan * ((tenor / 12) * interest + 1);
  let amountPerMonthInstallmentWithoutInterest =
    amountInstallmentWithoutInterest / tenor;
  return amountPerMonthInstallmentWithoutInterest;
};

const graDPUnpaid = (installmentUnpaid, loan) => {
  let amount = graDPIntallment(loan, false) * installmentUnpaid.length;
  return amount;
};

const graDPPartial = (installmentPartial, loan) => {
  let amountPerMonthInstallmentWithoutInterest = graDPIntallment(loan, false);

  installmentPartial.forEach((value, key, array) => {
    let paidAmount = 0;

    value.payments.forEach((valuePayment, keyPayment, arrayPayment) => {
      paidAmount += valuePayment.amount - valuePayment.trxFee;
    });
    paidAmount = paidAmount - value.installmentFee;
    let result = amountPerMonthInstallmentWithoutInterest - paidAmount;
    amount += result;
  });

  return amount;
};

const graDPIntallment = (loan, inter) => {
  let tenor = loan.graDP.tenor ? loan.graDP.tenor : 0;
  let amountLoan = loan.graDP.amount ? loan.graDP.amount : 0;
  let interest = inter ? loan.graDP.interestPct : 0;

  let amountInstallmentWithoutInterest =
    amountLoan * ((tenor / 12) * interest + 1);
  let amountPerMonthInstallmentWithoutInterest =
    amountInstallmentWithoutInterest / tenor;
  return amountPerMonthInstallmentWithoutInterest;
};

const graKaryaUnpaid = (installmentUnpaid, loan) => {
  let amount = 0;
  if (installmentUnpaid.length != 0) {
    amount = graKaryaInstallment(loan, false);
  }

  return amount;
};

const graKaryaPartial = (installmentPartial, loan) => {
  let tenor = loan.graKarya.tenor ? loan.graKarya.tenor : 0;
  let amountLoan = graKaryaInstallment(loan, false);
  let amount = 0;

  installmentPartial.forEach((value, key, array) => {
    if (tenor == value.installmentNumber) {
      let paidAmount = 0;
      value.payments.forEach((valuePayment, keyPayment, arrayPayment) => {
        paidAmount += valuePayment.amount - valuePayment.trxFee;
      });
      paidAmount = paidAmount - value.installmentFee;
      let result = amountLoan - paidAmount;
      amount += result;
    }
  });

  return amount;
};

const graKaryaInstallment = (loan, inter) => {
  let amount = loan.graKarya.amount ? loan.graKarya.amount : 0;

  if (inter) {
    let tenor = loan.graKarya.tenor ? loan.graKarya.tenor : 0;
    let amount = loan.graKarya.amount ? loan.graKarya.amount : 0;
    let interestPct = loan.graKarya.interestPct ? loan.graKarya.interestPct : 0;
    let interestPctByTenor = 1 + (tenor / 12) * interestPct;
    let borrowerPrice = amount * interestPctByTenor;
    return (borrowerPrice - amount) / tenor;
  }

  return amount;
};

const graStrataUnpaid = (installmentUnpaid, loan) => {
  return graStrataInstallment(loan, false) * installmentUnpaid.length;
};

const graStrataPartial = (installmentPartial, loan) => {
  let amountPerMonthInstallmentWithoutInterest = graStrataInstallment(
    loan,
    false
  );
  let amount = 0;
  installmentPartial.forEach((value, key, array) => {
    let paidAmount = 0;

    value.payments.forEach((valuePayment, keyPayment, arrayPayment) => {
      paidAmount += valuePayment.amount - valuePayment.trxFee;
    });
    paidAmount = paidAmount - value.installmentFee;
    let result = amountPerMonthInstallmentWithoutInterest - paidAmount;
    amount += result;
  });

  return amount;
};

const graStrataInstallment = (loan, inter) => {
  let flagDP = false;
  if (
    loan.graStrata.amountDP > 0 &&
    loan.graStrata.tenorDP > 0 &&
    loan.graStrata.interestPctDP > 0
  ) {
    flagDP = true;
  }

  let tenorRolling = loan.graStrata.tenorRolling
    ? loan.graStrata.tenorRolling
    : 0;
  let amountRolling = loan.graStrata.amountRolling
    ? loan.graStrata.amountRolling
    : 0;
  let interestRolling = inter ? loan.graStrata.interestPctRollingBorrower : 0;

  let amountRollingInstallmentWithoutInterest =
    amountRolling * ((tenorRolling / 12) * interestRolling + 1);
  let amountRolingPerMonthInstallmentWithoutInterest =
    amountRollingInstallmentWithoutInterest / tenorRolling;
  let amountDPPerMonthInstallmentWithoutInterest = 0;

  if (flagDP) {
    let tenorDP = loan.graStrata.tenorDP ? loan.graStrata.tenorDP : 0;
    let amountDP = loan.graStrata.amountDP ? oan.graStrata.amountDP : 0;
    let interestDP = inter ? loan.graStrata.interestPctDP : 0;
    let amountDPInstallmentWithoutInterest =
      amountDP * ((tenorDP / 12) * interestDP + 1);
    amountDPPerMonthInstallmentWithoutInterest =
      amountDPInstallmentWithoutInterest / tenorDP;
  }

  let amountPerMonthInstallmentWithoutInterest =
    amountRolingPerMonthInstallmentWithoutInterest +
    amountDPPerMonthInstallmentWithoutInterest;
  return amountPerMonthInstallmentWithoutInterest;
};

const graStrataCalculate = (loan) => {
  let data = [];
  let allOutstandingNumberWithoutInterest = 0;
  let allLoanAmountWithoutInterest = 0;
  loan.forEach((value) => {
    let loanAmountRolling = value.loan.graStrata.amountRolling
      ? value.loan.graStrata.amountRolling
      : 0;
    let loanAmountDP = value.loan.graStrata.amountDP
      ? value.loan.graStrata.amountDP
      : 0;
    let loanAmountWithoutInterest = loanAmountRolling + loanAmountDP;

    let installment = value.installment ? value.installment : [];
    let installmentPaid = value.installment
      ? value.installment.filter((val) => val.status == "paid")
      : [];
    let installmentUnpaid = value.installment
      ? value.installment.filter((val) => val.status == "unpaid")
      : [];
    let installmentPartial = value.installment
      ? value.installment.filter((val) => val.status == "partial")
      : [];

    let installmentUnpaidAmount =
      installmentUnpaid.length != 0
        ? graStrataUnpaid(installmentUnpaid, value.loan)
        : 0;
    let installmentPartialAmount =
      installmentPartial.length != 0
        ? graStrataPartial(installmentPartial, value.loan)
        : 0;

    let outstandingNumberWithoutInterest =
      installmentUnpaidAmount + installmentPartialAmount;

    let arr = {
      loanNumber: value.loan.loanNumber,
      loanInterest: value.loan.graStrata.interestPct,
      loanAmountWithoutInterest: loanAmountWithoutInterest,
      installmentAmountWithoutInterest: graStrataInstallment(value.loan, false),
      installmentAmountWithInterest: graStrataInstallment(value.loan, true),

      tenor: installment.length,
      countInstallmentPaid: installmentPaid.length,
      countInstallmentUnpaid: installmentUnpaid.length,
      countInstallmentPartial: installmentPartial.length,

      outstandingNumberWithoutInterest: outstandingNumberWithoutInterest,
    };
    allOutstandingNumberWithoutInterest += outstandingNumberWithoutInterest;
    allLoanAmountWithoutInterest += loanAmountWithoutInterest;
    data.push(arr);
  });

  let response = {
    allOutstandingNumberWithoutInterest: allOutstandingNumberWithoutInterest,
    allLoanAmountWithoutInterest: allLoanAmountWithoutInterest,
    details: data,
  };

  return response;
};

const graKaryaCalculate = (loans) => {
  let data = [];
  let allOutstandingNumberWithoutInterest = 0;
  let allLoanAmountWithoutInterest = 0;

  loans.forEach((value, index, array) => {
    let loanAmountWithoutInterest = value.loan.graKarya.amount
      ? value.loan.graKarya.amount
      : 0;

    let installment = value.installment ? value.installment : [];
    let installmentPaid = value.installment
      ? value.installment.filter((val) => val.status == "paid")
      : [];
    let installmentUnpaid = value.installment
      ? value.installment.filter((val) => val.status == "unpaid")
      : [];
    let installmentPartial = value.installment
      ? value.installment.filter((val) => val.status == "partial")
      : [];

    let installmentUnpaidAmount =
      installmentUnpaid.length != 0
        ? graKaryaUnpaid(installmentUnpaid, value.loan)
        : 0;
    let installmentPartialAmount =
      installmentPartial.length != 0
        ? graKaryaPartial(installmentPartial, value.loan)
        : 0;

    let outstandingNumberWithoutInterest =
      installmentUnpaidAmount + installmentPartialAmount;

    let arr = {
      loanNumber: value.loan.loanNumber,
      loanInterest: value.loan.graKarya.interestPct,
      loanAmountWithoutInterest: loanAmountWithoutInterest,
      installmentAmountWithoutInterest: graKaryaInstallment(value.loan, false),
      installmentAmountWithInterest: graKaryaInstallment(value.loan, true),

      tenor: installment.length,
      countInstallmentPaid: installmentPaid.length,
      countInstallmentUnpaid: installmentUnpaid.length,
      countInstallmentPartial: installmentPartial.length,

      outstandingNumberWithoutInterest: outstandingNumberWithoutInterest,
    };
    allOutstandingNumberWithoutInterest += outstandingNumberWithoutInterest;
    allLoanAmountWithoutInterest += loanAmountWithoutInterest;
    data.push(arr);
  });

  let response = {
    allOutstandingNumberWithoutInterest: allOutstandingNumberWithoutInterest,
    allLoanAmountWithoutInterest: allLoanAmountWithoutInterest,
    details: data,
  };

  return response;
};

const graDPCalculate = (loans) => {
  let data = [];
  let allOutstandingNumberWithoutInterest = 0;
  let allLoanAmountWithoutInterest = 0;

  loans.forEach((value, index, loan) => {
    let loanAmountWithoutInterest = value.loan.graDP.amount
      ? value.loan.graDP.amount
      : 0;

    let installment = value.installment ? value.installment : [];
    let installmentPaid = value.installment
      ? value.installment.filter((val) => val.status == "paid")
      : [];
    let installmentUnpaid = value.installment
      ? value.installment.filter((val) => val.status == "unpaid")
      : [];
    let installmentPartial = value.installment
      ? value.installment.filter((val) => val.status == "partial")
      : [];

    let installmentUnpaidAmount =
      installmentUnpaid.length != 0
        ? graDPUnpaid(installmentUnpaid, value.loan)
        : 0;
    let installmentPartialAmount =
      installmentPartial.length != 0
        ? graDPPartial(installmentPartial, value.loan)
        : 0;
    let outstandingNumberWithoutInterest =
      installmentUnpaidAmount + installmentPartialAmount;

    let arr = {
      loanNumber: value.loan.loanNumber,

      loanInterest: value.loan.graDP.interestPct,
      loanAmountWithoutInterest: loanAmountWithoutInterest,
      installmentAmountWithoutInterest: graDPInstallment(value.loan, false),
      installmentAmountWithInterest: graDPInstallment(value.loan, true),

      tenor: installment.length,
      countInstallmentPaid: installmentPaid.length,
      countInstallmentUnpaid: installmentUnpaid.length,
      countInstallmentPartial: installmentPartial.length,

      outstandingNumberWithoutInterest: outstandingNumberWithoutInterest,
    };
    allOutstandingNumberWithoutInterest += outstandingNumberWithoutInterest;
    allLoanAmountWithoutInterest += loanAmountWithoutInterest;
    data.push(arr);
  });

  let response = {
    allOutstandingNumberWithoutInterest: allOutstandingNumberWithoutInterest,
    allLoanAmountWithoutInterest: allLoanAmountWithoutInterest,
    details: data,
  };

  return response;
};

const graSewaCalculate = (loans) => {
  let data = [];
  let allOutstandingNumberWithoutInterest = 0;
  let allLoanAmountWithoutInterest = 0;

  loans.forEach((value, index, loan) => {
    let loanAmountWithoutInterest = value.loan.graSewa.amount
      ? value.loan.graSewa.amount
      : 0;

    let installment = value.installment ? value.installment : [];
    let installmentPaid = value.installment
      ? value.installment.filter((val) => val.status == "paid")
      : [];
    let installmentUnpaid = value.installment
      ? value.installment.filter((val) => val.status == "unpaid")
      : [];
    let installmentPartial = value.installment
      ? value.installment.filter((val) => val.status == "partial")
      : [];

    let installmentUnpaidAmount =
      installmentUnpaid.length != 0
        ? graSewaUnpaid(installmentUnpaid, value.loan)
        : 0;
    let installmentPartialAmount =
      installmentPartial.length != 0
        ? graSewaPartial(installmentPartial, value.loan)
        : 0;

    let outstandingNumberWithoutInterest =
      installmentUnpaidAmount + installmentPartialAmount;

    let arr = {
      loanNumber: value.loan.loanNumber,
      loanInterest: value.loan.graSewa.interestPct,
      loanAmountWithoutInterest: loanAmountWithoutInterest,
      installmentAmountWithoutInterest: graSewaInstallment(value.loan, false),
      installmentAmountWithInterest: graSewaInstallment(value.loan, true),

      tenor: installment.length,
      countInstallmentPaid: installmentPaid.length,
      countInstallmentUnpaid: installmentUnpaid.length,
      countInstallmentPartial: installmentPartial.length,

      outstandingNumberWithoutInterest: outstandingNumberWithoutInterest,
    };
    allOutstandingNumberWithoutInterest += outstandingNumberWithoutInterest;
    allLoanAmountWithoutInterest += loanAmountWithoutInterest;
    data.push(arr);
  });

  let response = {
    allOutstandingNumberWithoutInterest: allOutstandingNumberWithoutInterest,
    allLoanAmountWithoutInterest: allLoanAmountWithoutInterest,
    details: data,
  };

  return response;
};

export default {
  graSewaInstallment,
  graSewaUnpaid,
  graSewaPartial,
  graDPIntallment,
  graDPUnpaid,
  graDPPartial,
  graKaryaInstallment,
  graKaryaUnpaid,
  graKaryaPartial,
  graStrataInstallment,
  graStrataUnpaid,
  graStrataPartial,
  graStrataCalculate,
  graKaryaCalculate,
  graDPCalculate,
  graSewaCalculate,
};
