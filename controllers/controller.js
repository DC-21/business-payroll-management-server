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

async function management(req,res){
  try{
    const{name,position,email,phone,nrc,salary}=req.body;
    const newManager = await Management.create({
      name:name,
      position:position,
      email:email,
      phone:phone,
      nrc:nrc,
      salary:salary,
    });
    res.json({message:"manager successfully created"});
  }catch(error){
    console.error(error);
    res.status(500).json({error:"internal server error"});
  }
}

async function it(req,res){
  try{
    const{name,position,email,phone,nrc,salary}=req.body;
    const newIt = await IT.create({
      name:name,
      position:position,
      email:email,
      phone:phone,
      nrc:nrc,
      salary:salary,
    });
    res.json({message:"IT personnel created successfully"});
  }catch(error){
    console.error(error);
    res.status(500).json({error:"internal server error"});
  }
}

async function cleaners(req,res){
  try{
  const{name,position,email,phone,nrc,salary}=req.body;
  const newCleaner = await Cleaners.create({
    name:name,
    position:position,
    email:email,
    phone:phone,
    nrc:nrc,
    salary:salary,
  });
  res.json({message:"new cleaner created successfully"});
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
    const token = jwt.sign({ userId: user.id }, jwtSecretKey, { expiresIn: "2h" });

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

module.exports = { signUp, login, updatePassword, deleteUser, management, it };
