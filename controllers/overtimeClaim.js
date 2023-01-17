const Overtime = require("../models/Overtime");
const Employee = require("../models/Employee");
const bodyParser = require("body-parser");
const { findById } = require("../models/Employee");
const OvertimeClaim = require("../models/OvertimeClaim");


exports.list = async (req, res) => {
  const perPage = 10;
  const limit = parseInt(req.query.limit) || 10; 
  const page = parseInt(req.query.page) || 1;
  const message = req.query.message;


  try {
    const overtimeClaims = await Overtime.find({}).skip((perPage * page) - perPage).limit(limit);
    const count = await Overtime.find({}).count();
    const numberOfPages = Math.ceil(count / perPage);

    res.render("overtimeClaims", {
      overtimeClaims: overtimeClaims,
      numberOfPages: numberOfPages,
      currentPage: page,
      message: message
    });
  } catch (e) {
    res.status(404).send({ message: "could not list overtime claims" });
  }
};

exports.edit = async (req, res) => {
  const id = req.params.id;
  try {
    const employees = await Employee.find({});
    const overtimeClaim = await OvertimeClaim.findById(id);
    if (!overtimeClaim) throw Error('cant find overtime claim');
    res.render('update-overtimeClaim', {
      overtime: overtime,
      hours: hours,
      employees: employees,
      errors: {}
    });
  } catch (e) {
    console.log(e)
    if (e.errors) {
      res.render('create-overtimeClaim', { errors: e.errors })
      return;
    }
    res.status(404).send({
      message: `couldn't find employee ${id}`,
    });
  }
};

exports.create = async (req, res) => {
  try {

    const employee = await Employee.findById(req.body.employee_id);
    await OvertimeClaim.create({
      overtimeCode: req.body.overtimeCode,
      payrollNumber: employee.payrollNumber,
      hours: parseInt(req.body.hours),
      date: date.now(req.body.date),
    })

    res.redirect('/overtimeClaims/?message=overtime has been created')
  } catch (e) {
    if (e.errors) {
      res.render('create-overtimeClaim', { errors: e.errors })
      return;
    }
    return res.status(400).send({
      message: JSON.parse(e),
    });
  }
}

exports.createView = async (req, res) => {
  try {
    const overtime = await Overtime.find({});
    const employees = await Employee.find({});
    res.render("create-overtimeClaim", {
      overtime: overtime,
      employees: employees,
      errors: {}
    });

  } catch (e) {
    res.status(404).send({
      message: `couldn't generate create data`,
    });
  }
}

exports.delete = async (req, res) => {
  const id = req.params.id;
  try {
    await OvertimeClaim.findByIdAndRemove(id);
    res.redirect("/tastings");
  } catch (e) {
    res.status(404).send({
      message: `couldn't delete record ${id}.`,
    });
  }
};

