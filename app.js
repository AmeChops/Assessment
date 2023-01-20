require("dotenv").config();
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const chalk = require("chalk");
const bodyParser = require("body-parser");
const expressSession = require("express-session");
const Employee = require("./models/Employee");
const employeeController = require("./controllers/employee");
const overtimeClaimController = require("./controllers/overtimeClaim");
const homeController = require("./controllers/home");

const app = express();
app.set("view engine", "ejs");


const { PORT, MONGODB_URI } = process.env;


mongoose.connect(MONGODB_URI, { useNewUrlParser: true });
mongoose.connection.on("error", (err) => {
  console.error(err);
  console.log(
    "MongoDB connection error. Please make sure MongoDB is running.",
    chalk.red("✗")
  );
  process.exit();
});


app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(expressSession({ secret: 'foo barr', cookie: { expires: new Date(253402300000000) } }))


app.use("*", async (req, res, next) => {
  global.employee = false;
  if (req.session.employeeID && !global.employee) {
    const employee = await Employee.findById(req.session.employeeID);
    global.employee = employee;
  }
  next();
})

const authMiddleware = async (req, res, next) => {
  const employee = await Employee.findById(req.session.employeeID);
  if (!employee) {
    return res.redirect('/');
  }
  next()
}

app.get("/", homeController.list);

app.get("/logout", async (req, res) => {
  req.session.destroy();
  global.employee = false;
  res.redirect('/');
});

app.get("/join", (req, res ) => {
  res.render('createEmployee', {errors: {} })
});
app.post("/join", employeeController.create);
app.get("/login", (req, res) => {
  res.render('loginEmployee', { errors: {} })
});

app.post("/login", employeeController.login);
app.get("/login", (req, res) => {
    res.render('loginEmployee', { errors: {} })
});

app.get("/employee", employeeController.list);
app.get("/employee/delete/:id", employeeController.delete);
app.get("/employee/list/:id", employeeController.edit);
app.post("/employee/update/:id", employeeController.update);


app.get("/createOvertimeClaim", overtimeClaimController.createView);
app.post("/createOvertimeClaim", overtimeClaimController.create);
app.get("/updateOvertimeClaim/:id", overtimeClaimController.edit);


app.get("/overtimeClaims", overtimeClaimController.list);
app.get("/overtimeClaims/delete/:id", overtimeClaimController.delete);


app.get("/searchOvertime", (req, res) => res.render('searchOvertime'));


app.listen(PORT, () => {
  console.log(
    `Example app listening at http://localhost:${PORT}`,
    chalk.green("✓")
  );
});
