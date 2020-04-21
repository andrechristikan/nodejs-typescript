class DashboardController {
  constructor() {}

  static index = async (req, res, next) => {
    let json = structure.success(trans("dashboard.index.success"));
    res.status(200).json(json);
  };
}

export default DashboardController;
