const { hashPassword, comparePassword } = require("../helpers/authHelper");
const { User, Task } = require("../models/userModel");
const JWT = require("jsonwebtoken");

const registerController = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;
    //! validations
    if (!name) {
      return res.send({ error: "Name is required" });
    }
    if (!email) {
      return res.send({ error: "email is required" });
    }
    if (!phone) {
      return res.send({ error: "phone is required" });
    }
    if (!password) {
      return res.send({ error: "password is required" });
    }

    //   ! check user if already exist
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(200).send({
        success: false,
        message: "Already Register please login",
      });
    }

    //   !  if new user then register and save
    const hashPass = await hashPassword(password);
    //   ? save
    const user = await new User({
      name,
      email,
      password: hashPass,
      phone,
    }).save();
    res
      .status(200)
      .send({ success: true, message: "User Registered Successfully", user });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Registration",
      error,
    });
  }
};

// ! LOGIN (Post) CONTROLLER
const loginController = async (req, res) => {
  try {
    const { password, email } = req.body;
    // ? validation
    if (!email || !password) {
      return res
        .status(404)
        .send({ success: false, message: "Invalid Email or Password" });
    }

    // check user is registered
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send({
        status: false,
        success: false,
        message: "Email is not registered ",
      });
    }
    // if registered check password
    const matched = await comparePassword(password, user.password);
    if (!matched) {
      return res.status(200).send({
        status: false,
        message: "Invalid Password",
      });
    }
    // Password matches
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.status(200).send({
      status: true,
      message: "Successfully Login",
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Login",
      error,
    });
  }
};

//? createAgentFn
// ! CREATE AGENTS
const createTaskController = async (req, res) => {
  try {
    const { tasks, agentId, agentName } = req.body;
    //! validations
    if (!agentId || !tasks.length) {
      return res.status(400).json({ message: "Invalid data provided" });
    }

    const tasksWithAgentId = tasks.map((task) => ({
      ...task,
      agentId,
      agentName,
    }));

    //   ? save
    await Task.insertMany(tasksWithAgentId);
    res
      .status(200)
      .send({ success: true, message: "Task created successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in task creation",
      error,
    });
  }
};

//? TEST TOKEN
const testController = (req, res) => {
  res.send("Token working");
};

//? GET AGENTS

const getAgentsController = async (req, res) => {
  try {
    let agent = await User.find({ role: { $ne: 1 } });
    res
      .status(200)
      .send({ success: true, message: "Agent fetched successfully", agent });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Can't find agent",
      error,
    });
  }
};

//? GET TASKS

const getTasksController = async (req, res) => {
  try {
    let task = await Task.find({});
    res
      .status(200)
      .send({ success: true, message: "Tasks fetched successfully", task });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Can't find agent",
      error,
    });
  }
};

// ! EXPORTS
module.exports = {
  registerController,
  loginController,
  createTaskController,
  testController,
  getAgentsController,
  getTasksController,
};
