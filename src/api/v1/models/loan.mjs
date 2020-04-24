import mongoose from "mongoose";

export const tablename = "loans";
export const schema = new mongoose.Schema({});
export const model = mongoose.model(tablename, schema);

export const scopeOutStandingWithProductType = (product_type) => {
  return [
    {
      $match: {
        $and: [
          { status: "disbursed" },
          { "product.productType": product_type },
        ],
      },
    },
    {
      $lookup: {
        from: "users",
        as: "borrowerLookup",
        localField: "borrower.borrowerData",
        foreignField: "_id",
      },
    },
    { $unwind: "$borrowerLookup" },
    { $match: { "borrowerLookup.role": "borrower" } },

    {
      $lookup: {
        from: "installments",
        as: "installmentsLookup",
        localField: "_id",
        foreignField: "loan",
      },
    },
    {
      $lookup: {
        from: "loanstatushistories",
        as: "loanStatusLookup",
        localField: "_id",
        foreignField: "loan",
      },
    },
    {
      $sort: { "loanStatusLookUp.createdAt": 1 },
    },

    {
      $project: {
        loanNumber: "$$ROOT.loanNumber",
        loan: "$$ROOT",
        installment: "$installmentsLookup",
        borrower: "$borrowerLookup",
        loanStatus: {
          $filter: {
            input: "$loanStatusLookup",
            as: "loanStatusLu",
            cond: {
              $eq: ["$$loanStatusLu.currentStatus", "disbursed"],
              $eq: ["$$loanStatusLu.previousStatus", "funded"],
            },
          },
        },
      },
    },
    { $unwind: "$loanStatus" },
    // {
    //     $match : {
    //         $and : [
    //             {"_id.disbursedMonthCreated": 3},
    //             {"_id.disbursedYearCreated": 2020}
    //         ],
    //     }
    // }
  ];
};

export const scopeOutStandingProvinceWithoutGroup = () => {
  return [
    {
      $match: {
        $and: [{ status: "disbursed" }],
      },
    },
    {
      $lookup: {
        from: "users",
        as: "borrowerLookup",
        localField: "borrower.borrowerData",
        foreignField: "_id",
      },
    },
    { $unwind: "$borrowerLookup" },
    { $match: { "borrowerLookup.role": "borrower" } },

    {
      $lookup: {
        from: "installments",
        as: "installmentsLookup",
        localField: "_id",
        foreignField: "loan",
      },
    },
    {
      $lookup: {
        from: "loanstatushistories",
        as: "loanStatusLookup",
        localField: "_id",
        foreignField: "loan",
      },
    },
    {
      $sort: { "loanStatusLookUp.createdAt": 1 },
    },

    {
      $project: {
        loanNumber: "$$ROOT.loanNumber",
        loan: "$$ROOT",
        installment: "$installmentsLookup",
        borrower: "$borrowerLookup",
        loanStatus: {
          $filter: {
            input: "$loanStatusLookup",
            as: "loanStatusLu",
            cond: {
              $eq: ["$$loanStatusLu.currentStatus", "disbursed"],
              $eq: ["$$loanStatusLu.previousStatus", "funded"],
            },
          },
        },
      },
    },
    { $unwind: "$loanStatus" },
  ];
};

export const scopeOutStandingProvince = () => {
  let newScope = scopeOutStandingProvinceWithoutGroup();
  newScope.push({
    $group: {
      _id: {
        province: { $ifNull: ["$borrower.province", "Undefined Province"] },
      },
      loan: { $addToSet: "$$ROOT" },
      count: { $sum: 1 },
    },
  });
  return newScope;
};

export const scopeOutStandingProvinceWithMonthAndYear = (month, year) => {
  let newScope = scopeOutStandingProvinceWithoutGroup();
  newScope.push(
    {
      $group: {
        _id: {
          province: { $ifNull: ["$borrower.province", "Undefined Province"] },
          disbursedMonthCreated: { $month: "$loanStatus.createdDate" },
          disbursedYearCreated: { $year: "$loanStatus.createdDate" },
        },
        loan: { $addToSet: "$$ROOT" },
        count: { $sum: 1 },
      },
    },
    {
      $match: {
        $and: [
          { "_id.disbursedMonthCreated": month },
          { "_id.disbursedYearCreated": year },
        ],
      },
    }
  );
  return newScope;
};

export const scopeOutStandingUniqueBorrowerWithoutGroup = () => {
  return [
    {
      $match: {
        $and: [{ status: "disbursed" }],
      },
    },
    {
      $lookup: {
        from: "users",
        as: "borrowerLookup",
        localField: "borrower.borrowerData",
        foreignField: "_id",
      },
    },
    { $unwind: "$borrowerLookup" },
    { $match: { "borrowerLookup.role": "borrower" } },

    {
      $lookup: {
        from: "installments",
        as: "installmentsLookup",
        localField: "_id",
        foreignField: "loan",
      },
    },
    {
      $lookup: {
        from: "loanstatushistories",
        as: "loanStatusLookup",
        localField: "_id",
        foreignField: "loan",
      },
    },
    {
      $sort: { "loanStatusLookUp.createdAt": 1 },
    },

    {
      $project: {
        loanNumber: "$$ROOT.loanNumber",
        loan: "$$ROOT",
        installment: "$installmentsLookup",
        borrower: "$borrowerLookup",
        loanStatus: {
          $filter: {
            input: "$loanStatusLookup",
            as: "loanStatusLu",
            cond: {
              $eq: ["$$loanStatusLu.currentStatus", "disbursed"],
              $eq: ["$$loanStatusLu.previousStatus", "funded"],
            },
          },
        },
      },
    },
    { $unwind: "$loanStatus" },
  ];
};

export const scopeOutStandingUniqueBorrower = () => {
  let newScope = scopeOutStandingUniqueBorrowerWithoutGroup();
  newScope.push({
    $group: {
      _id: {
        borrowerId: "$borrower._id",
        borrowerName: {
          $concat: ["$borrower.name.first", " ", "$borrower.name.last"],
        },
      },
      loan: { $addToSet: "$$ROOT" },
      count: { $sum: 1 },
    },
  });
  return newScope;
};

export const scopeOutStandingUniqueBorrowerWithMonthAndYear = (month, year) => {
  let newScope = scopeOutStandingUniqueBorrowerWithoutGroup();
  newScope.push(
    {
      $group: {
        _id: {
          borrowerId: "$borrower._id",
          borrowerName: {
            $concat: ["$borrower.name.first", " ", "$borrower.name.last"],
          },
          disbursedMonthCreated: { $month: "$loanStatus.createdDate" },
          disbursedYearCreated: { $year: "$loanStatus.createdDate" },
        },
        loan: { $addToSet: "$$ROOT" },
        count: { $sum: 1 },
      },
    },
    {
      $match: {
        $and: [
          { "_id.disbursedMonthCreated": month },
          { "_id.disbursedYearCreated": year },
        ],
      },
    }
  );
  return newScope;
};

export const scopeOutstandingAgeWithoutGroup = () => {
  return [
    {
      $match: {
        $and: [{ status: "disbursed" }],
      },
    },
    {
      $lookup: {
        from: "users",
        as: "borrowerLookup",
        localField: "borrower.borrowerData",
        foreignField: "_id",
      },
    },
    { $unwind: "$borrowerLookup" },
    { $match: { "borrowerLookup.role": "borrower" } },

    {
      $lookup: {
        from: "installments",
        as: "installmentsLookup",
        localField: "_id",
        foreignField: "loan",
      },
    },
    {
      $lookup: {
        from: "loanstatushistories",
        as: "loanStatusLookup",
        localField: "_id",
        foreignField: "loan",
      },
    },
    {
      $sort: { "loanStatusLookUp.createdAt": 1 },
    },

    {
      $project: {
        loanNumber: "$$ROOT.loanNumber",
        loan: "$$ROOT",
        installment: "$installmentsLookup",
        borrower: "$borrowerLookup",
        loanStatus: {
          $filter: {
            input: "$loanStatusLookup",
            as: "loanStatusLu",
            cond: {
              $eq: ["$$loanStatusLu.currentStatus", "disbursed"],
              $eq: ["$$loanStatusLu.previousStatus", "funded"],
            },
          },
        },
      },
    },
    { $unwind: "$loanStatus" },
  ];
};

export const scopeOutstandingAge = (start, end) => {
  let newScope = scopeOutstandingAgeWithoutGroup();
  newScope.push(
    {
      $group: {
        _id: {
          age: {
            $floor: {
              $divide: [
                {
                  $subtract: [
                    "$loanStatus.createdDate",
                    { $ifNull: ["$borrower.dateOfBirth", new Date()] },
                  ],
                },
                1000 * 60 * 60 * 24 * 365,
              ],
            },
          },
        },
        loan: { $addToSet: "$$ROOT" },
        count: { $sum: 1 },
      },
    },
    {
      $match: {
        "_id.age": { $gte: start, $lte: end },
      },
    }
  );
  return newScope;
};

export const scopeOutstandingAgeWithMonthAndYear = (
  start,
  end,
  month,
  year
) => {
  let newScope = scopeOutstandingAgeWithoutGroup();
  newScope.push(
    {
      $group: {
        _id: {
          age: {
            $floor: {
              $divide: [
                {
                  $subtract: [
                    "$loanStatus.createdDate",
                    { $ifNull: ["$borrower.dateOfBirth", new Date()] },
                  ],
                },
                1000 * 60 * 60 * 24 * 365,
              ],
            },
          },
          disbursedMonthCreated: { $month: "$loanStatus.createdDate" },
          disbursedYearCreated: { $year: "$loanStatus.createdDate" },
        },
        loan: { $addToSet: "$$ROOT" },
        count: { $sum: 1 },
      },
    },
    {
      $match: {
        "_id.age": { $gte: start, $lte: end },
        $and: [
          { "_id.disbursedMonthCreated": month },
          { "_id.disbursedYearCreated": year },
        ],
      },
    }
  );
  return newScope;
};
