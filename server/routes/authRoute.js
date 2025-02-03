const express = require("express");
const {
  registerController,
  loginController,
  createTaskController,
  testController,
  getAgentsController,
  getTasksController,
} = require("../controllers/authController");
const { requireSignIn, isAdmin } = require("../middlewares/authMiddleware");

//router object
const router = express.Router();

//routing
// ! REGISTER  (METHOD POST)
router.post("/register", registerController);

// ! LOGIN  (METHOD POST)
router.post("/login", loginController);

// !protected rotes auth
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

// ! CREATE AGENTS  (METHOD POST)
router.post("/createTask", createTaskController);

// !protected roUtes demo
router.get("/get", requireSignIn, isAdmin, testController);

// ! GET AGENTS
router.get("/getAgents", getAgentsController);

// ! GET TASKS
router.get("/getTasks", getTasksController);

module.exports = router;
