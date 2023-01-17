const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require('bcrypt');

const employeeSchema = new Schema(
    {
        payrollNumber: { type: Number, required: [true, 'payroll number is required'], unique: true },
        password: { type: String, required: [true, 'password is required'] }
    },
    { timestamps: true }
);

employeeSchema.pre('save', async function (next) {
    console.log(this.password);
    try {
        const hash = await bcrypt.hash(this.password, 10);
        this.password = hash;
        next();
    } catch (e) {
        throw Error('could not hash password');
    }
})

module.exports = mongoose.model("User", employeeSchema);