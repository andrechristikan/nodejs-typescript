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
