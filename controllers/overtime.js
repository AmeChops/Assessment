const Overtime = require("../models/Overtime");

exports.list = async (req, res) => {
  try {
    console.log(req.query)
    const message = req.query.message;
    const overtimeCodes = await Overtime.find({});
    res.render("overtimeCodes", { overtimeCodes: overtimeCodes, message: message });
  } catch (e) {
    res.status(404).send({ message: "could not list overtime codes" });
  }
};



