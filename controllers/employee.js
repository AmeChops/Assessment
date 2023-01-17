const employee = require('../models/Employee');
const bcrypt = require('bcrypt');

exports.login = async (req, res) => {
    try {
        const employee = await Employee.findOne({ payrollNumber: req.body.payrollNumber });
        if (!employee) {
            res.render('login-employee', { errors: { payrollNumber: { message: 'payroll number not found' } } })
            return;
        }

        const match = await bcrypt.compare(req.body.password, employee.password);
        if (match) {
            req.session.userID = employee._id;
            console.log(req.session.userID);
            res.redirect('/');
            return
        }

        res.render('login-employee', { errors: { password: { message: 'password does not match' } } })


    } catch (e) {
        return res.status(400).send({
            message: JSON.parse(e),
        });
    }
}

exports.create = async (req, res) => {
    try {

        const user = new employee({ payrollNumber: req.body.payrollNumber, password: req.body.password });
        await user.save();
        res.redirect('/?message=user saved')
    } catch (e) {
        if (e.errors) {
            console.log(e.errors);
            res.render('create-employee', { errors: e.errors })
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
      const employees = await Employee.find({});
      res.render("employees", { employees: employees, message: message });
    } catch (e) {
      res.status(404).send({ message: "could not list employees" });
    }
  };
  
  exports.delete = async (req, res) => {
    const id = req.params.id;
  
    try {
  
      await Employee.findByIdAndRemove(id);
      res.redirect("/employees");
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
        message: `could find taster ${id}.`,
      });
    }
  };
  
  exports.update = async (req, res) => {
    const id = req.params.id;
    try {
      const employee = await Employee.updateOne({ _id: id }, req.body);
      res.redirect('/employees/?message=employee has been updated');
    } catch (e) {
      res.status(404).send({
        message: `could find employee ${id}.`,
      });
    }
  };