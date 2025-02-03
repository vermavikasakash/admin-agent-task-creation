import axios from "axios";

//? REGISTER API
const registerFunction = async (payload) => {
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API}/api/v1/auth/register`,
      payload
    );
    return res;
  } catch (error) {
    console.log(error);
    return error;
  }
};

//? LOGIN API

const loginFunction = async (payload) => {
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API}/api/v1/auth/login`,
      payload
    );
    return res;
  } catch (error) {
    console.log(error);
    return error;
  }
};

//? AGENT CREATION API
const agentCreationFunction = async (payload) => {
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API}/api/v1/auth/createAgent`,
      payload
    );
    return res;
  } catch (error) {
    console.log(error);
    return error;
  }
};

//? TASKS CREATION API
const taskCreationFunction = async (tasks) => {
  try {
    
    // Filter out entries where agent or tasks are missing/empty
    const validTasks = tasks.filter(
      ({ agent, tasks }) => agent && agent._id && tasks && tasks.length > 0
    );

    if (validTasks.length === 0) {
      console.warn("No valid tasks to post.");
      return;
    }

    const requests = validTasks.map(({ agent, tasks }) => {
      return axios.post(`${process.env.REACT_APP_API}/api/v1/auth/createTask`, {
        agentId: agent._id, // Send agent's ID
        agentName: agent.name,
        tasks: tasks, // Send tasks related to this agent
      });
    });

    const responses = await Promise.all(requests); // Wait for all API calls
    console.log(
      "All tasks posted successfully:",
      responses.map((res) => res.data)
    );
    return responses[0];
  } catch (error) {
    console.error("Error posting tasks:", error);
  }
};

//? GET AGENT API
const getAgentsFunction = async () => {
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_API}/api/v1/auth/getAgents`
    );
    return res;
  } catch (error) {
    console.log(error);
    return error;
  }
};

//? GET TASKS API
const getTasksFunction = async () => {
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_API}/api/v1/auth/getTasks`
    );
    return res;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export {
  registerFunction,
  loginFunction,
  agentCreationFunction,
  taskCreationFunction,
  getAgentsFunction,
  getTasksFunction,
};
