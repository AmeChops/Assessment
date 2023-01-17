const employee = require('../models/Employee');
const bcrypt = require('bcrypt');

exports.login = async (req, res) => {
    try {
        const employee = await Employee.findOne({ payrollNumber: req.body.payrollNumber });
        if (!employee) {
            res.render('login-user', { errors: { payrollNumber: { message: 'payroll number not found' } } })
            return;
        }

        const match = await bcrypt.compare(req.body.password, employee.password);
        if (match) {
            req.session.userID = employee._id;
            console.log(req.session.userID);
            res.redirect('/');
            return
        }

        res.render('login-user', { errors: { password: { message: 'password does not match' } } })


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
            res.render('create-user', { errors: e.errors })
            return;
        }
        return res.status(400).send({
            message: JSON.parse(e),
        });
    }
}