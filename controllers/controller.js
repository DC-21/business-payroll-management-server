const Users = require("../models/Users");
const IT = require("../models/IT");
const Management = require("../models/Management");
const Security = require("../models/Security");
const Finance = require("../models/Finance");
const Departments = require("../models/Departments");
const CompanyFinance = require("../models/CompanyFinance");
const Cleaners = require("../models/Cleaners");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const jwtSecretKey = "your-secret-key";

async function signUp(req, res) {
  try {
    const { full_name, email, phone_no, password } = req.body;

    // Hash the password before saving it to the database
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await Users.create({
      full_name: full_name,
      email: email,
      phone_no: phone_no,
      password: hashedPassword,
    });

    res.json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function getSignup(req,res){
  try{
    const allSignup = await Users.findAll();
    res.json({signup:allSignup});
  }catch(error){
    console.error(error);
    res.status(500).json({error:"internal server error"});
  }
}

async function management(req, res) {
  try {
    const { name, position, email, phone, nrc, salary,account_no } = req.body;
    const newManager = await Management.create({
      name: name,
      position: position,
      email: email,
      phone: phone,
      nrc: nrc,
      salary: salary,
      account_no:account_no,
    });
    res.json({ message: "manager successfully created" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "internal server error" });
  }
}

async function getManagement(req,res){
  try{
  const allManagement = await Management.findAll();
  res.json({management:allManagement});
  }catch(error){
    console.error(error);
    res.status(5005).json({error:"internal server error"});
  }
}

async function it(req, res) {
  try {
    const { name, position, email, phone, nrc, salary, account_no } = req.body;
    const newIt = await IT.create({
      name: name,
      position: position,
      email: email,
      phone: phone,
      nrc: nrc,
      salary: salary,
      account_no:account_no,
    });
    res.json({ message: "IT personnel created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "internal server error" });
  }
}

async function getIt(req,res){
  try{
    const allIT = await IT.findAll();
    res.json({it:allIT});
  }catch(error){
    console.error(error);
    res.status(500).json({error:"internal server error"});
  }
}

async function cleaners(req, res) {
  try {
    const { name, position, email, phone, nrc, salary, account_no } = req.body;
    const newCleaner = await Cleaners.create({
      name: name,
      position: position,
      email: email,
      phone: phone,
      nrc: nrc,
      salary: salary,
      account_no:account_no
    });
    res.json({ message: "new cleaner created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "internal server error" });
  }
}

async function getCleaners(req,res){
  try{
  const allCleaners = await Cleaners.findAll();
  res.json({cleaners:allCleaners});
  }catch(error){
    console.error(error);
    res.status(500).json({error:"internal server error"});
  }
}

async function security(req,res){
  try{
    const {name,position,email,phone,nrc,salary,account_no}=req.body;
    const newSecurity=await Security.create({
      name:name,
      position:position,
      email:email,
      phone:phone,
      nrc:nrc,
      salary:salary,
      account_no:account_no
    });
    res.json({message:"new security created successfully"});
  }catch(error){
    console.error(error);
    res.status(500).json({error:"internal server error"})
  }
}

async function getSecurity(req,res){
  try{
    const allSecurity = await Security.findAll();
    res.json({security:allSecurity});
  }catch(error){
    console.error(error);
    res.status(500).json({error:"internal server error"});
  }
}

async function finance(req,res){
  try{
    const{name,position,email,phone,nrc,salary,account_no}=req.body;
    const newFinance=await Finance.create({
      name:name,
      position:position,
      email:email,
      phone:phone,
      salary:salary,
      nrc:nrc,
      account_no:account_no
    });
    res.json({message:"new finance added successfully"});
  }catch(error){
    console.error(error);
    res.status(500).json({error:"internal server error"});
  }
}

async function getFinance(req,res){
  try{
    const allFinance = await Finance.findAll();
    res.json({finance:allFinance});
  }catch(error){
    console.error(error);
    res.status(500).json({error:"internal server error"});
  }
}

async function departments(req,res){
  try{
    const{Name,Number_of_employees}=req.body;
    const newDepartment = await Departments.create({
      Name:Name,
      Number_of_employees:Number_of_employees,
    })
    res.json({message:"new department added successfully"});
  }catch(error){
    console.error(error);
    res.status(500).json({error:"internal server error"});
  }
}

async function getDepartments(req, res) {
  try {
    const allDepartments = await Departments.findAll();

    res.json({ departments: allDepartments });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}


async function companyFinance(req,res){
  try{
    const{year,Month,balance}=req.body;
    const newCompanyFinance=await CompanyFinance.create({
      year:year,
      Month:Month,
      balance:balance,
    })
    res.json({message:"new balance added"});
  }catch(error){
    console.error(error);
    res.status(500).json({error:"internal server error"});
  }
}

async function getCompanyFinance(req,res){
  try{
    const allCompanyFinance = await CompanyFinance.findAll();
    res.json({companyFinance:allCompanyFinance});
  }catch(error){
    console.error(error);
    res.status(500).json({error:"internal server error"});
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;
    const user = await Users.findOne({ where: { email: email } });

    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user.id }, jwtSecretKey, {
      expiresIn: "2h",
    });

    res.json({ token: token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function updatePassword(req, res) {
  try {
    const { email, oldPassword, newPassword } = req.body;
    const user = await Users.findOne({ where: { email: email } });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const passwordMatch = await bcrypt.compare(oldPassword, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    await user.update({ password: hashedNewPassword });

    res.json({ message: "Password updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function deleteUser(req, res) {
  try {
    const { email } = req.body;
    const user = await Users.findOne({ where: { email: email } });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    await user.destroy();
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = { signUp,getSignup, login, updatePassword, deleteUser, management,getManagement, it,getIt, cleaners,getCleaners, companyFinance,getCompanyFinance, security,getSecurity, departments,getDepartments, finance, getFinance };
