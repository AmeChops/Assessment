const employee = require('../models/Employee');
const bcrypt = require('bcrypt');

exports.login = async (req, res) => {
    try {
        const employee = await Employee.findOne({ payrollNumber: req.body.payrollNumber });
        if (!employee) {
            res.render('loginEmployee', { errors: { payrollNumber: { message: 'payroll number not found' } } })
            return;
        }

        const match = await bcrypt.compare(req.body.password, employee.password);
        if (match) {
            req.session.employeeID = employee._id;
            console.log(req.session.employeeID);
            res.redirect('/');
            return
        }

        res.render('loginEmployee', { errors: { password: { message: 'password does not match' } } })


    } catch (e) {
        return res.status(400).send({
            message: JSON.parse(e),
        });
    }
}

exports.create = async (req, res) => {
    try {

        const employee = new employee({ payrollNumber: req.body.payrollNumber, password: req.body.password });
        await employee.save();
        res.redirect('/?message=employee saved')
    } catch (e) {
        if (e.errors) {
            console.log(e.errors);
            res.render('createEmployee', { errors: e.errors })
            return;
        }
        return res.status(400).send({
            message: JSON.parse(e),
        });
    }
}

exports.list = async (req, res) => {
    try {
      console.log(req.query)
      const message = req.query.message;
      const employee = await Employee.find({});
      res.render("employee", { employee: employee, message: message });
    } catch (e) {
      res.status(404).send({ message: "could not list employee" });
    }
  };
  
  exports.delete = async (req, res) => {
    const id = req.params.id;
  
    try {
  
      await Employee.findByIdAndRemove(id);
      res.redirect("/employee");
    } catch (e) {
      res.status(404).send({
        message: `could not delete record ${id}.`,
      });
    }
  };
  exports.edit = async (req, res) => {
    const id = req.params.id;
    try {
      const employee = await Employee.findById(id);
      res.render('update-employee', { employee: employee, id: id });
    } catch (e) {
      res.status(404).send({
        message: `couldn't find employee ${id}.`,
      });
    }
  };
  
  exports.update = async (req, res) => {
    const id = req.params.id;
    try {
      const employee = await Employee.updateOne({ _id: id }, req.body);
      res.redirect('/employee/?message=employee has been updated');
    } catch (e) {
      res.status(404).send({
        message: `couldn't find employee ${id}.`,
      });
    }
  };