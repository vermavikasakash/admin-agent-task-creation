import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import Task_Template from "../../components/Task_Template.xls";
import styles from "../AgentScreen/AgentCreation.module.css";
import { Button, Col, Container, Row, Form, Table } from "react-bootstrap";
import {
  getAgentsFunction,
  taskCreationFunction,
} from "../../serviceApi/registerApi";
import * as XLSX from "xlsx";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const TaskCreation = () => {
  const [task, setTask] = useState([]);
  const [agents, setAgents] = useState([]);
  const navigate = useNavigate();
  const [distributedTasks, setDistributedTasks] = useState([]); // To Holds the tasks assigned to agents

  // ? GET AGENTS
  const getAgents = async () => {
    let result = await getAgentsFunction();
    if (result?.status === 200) {
      setAgents(result?.data?.agent);
    }
  };

  useEffect(() => {
    getAgents();
  }, []);

  // ?  READING EXCEL FILE
  const readExcel = (file) => {
    const promise = new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);

      fileReader.onload = (e) => {
        const bufferArray = e.target.result;
        const wb = XLSX.read(bufferArray, { type: "buffer" });
        const wsName = wb.SheetNames[0];
        const ws = wb.Sheets[wsName];
        const data = XLSX.utils.sheet_to_json(ws);
        resolve(data);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
    promise.then((data) => {
      setTask(data);
      // Distributing the tasks after reading it
      distributeTasks(data);
    });
  };

  // ? Distribute tasks equally among agents
  const distributeTasks = (tasks) => {
    const totalTasks = tasks.length;
    const totalAgents = agents.length;
    // Number of tasks each agent will gets
    const tasksPerAgent = Math.floor(totalTasks / totalAgents);
    // Remaining tasks
    const remainingTasks = totalTasks % totalAgents;

    // Initializing an array to hold the distributed tasks
    const taskDistribution = agents.map((agent, index) => {
      // Finding the range of tasks to assign to this agent
      const startIdx = index * tasksPerAgent;
      const endIdx = startIdx + tasksPerAgent;
      const assignedTasks = tasks.slice(startIdx, endIdx);

      // Distribute the remaining tasks (round-robin)
      if (index < remainingTasks) {
        assignedTasks.push(tasks[endIdx + index]); // Add remaining tasks to agents sequentially
      }

      return { agent, tasks: assignedTasks };
    });

    setDistributedTasks(taskDistribution);
  };

  console.log("distributedTasks", distributedTasks);

  //? Task Creation API Call
  const uploadHandler = async () => {
    if (task.length === 0) {
      toast.error("No valid tasks found in the uploaded file!");
      return;
    }

    // Define required keys for validation
    const requiredKeys = ["SNo", "firstName", "phone", "notes"];

    // Check if all required keys exist in the first row of the parsed Excel data
    const isValidFile = requiredKeys.every((key) => key in task[0]);

    if (!isValidFile) {
      toast.error(
        "Invalid file format! Please upload the correct Excel template."
      );
      return;
    }

    let result = await taskCreationFunction(distributedTasks);
    if (result.status == 200) {
      toast.success(result.data.message);
      navigate("/home-page");
    }
  };

  // ! JSX START
  return (
    <Layout>
      <p className={styles.top_heading}>Task Creation </p>
      <Container>
        <Button variant="dark">
          <a href={Task_Template} download="Task_Template">
            Download Task Template
          </a>
        </Button>

        {/* //? UPLOAD FILE */}
        <Row className={styles.uploadFileDiv}>
          <label className={`${styles.uploadFileText} `}>Upload File</label>{" "}
          <br />
          <Col md={4}>
            <input
              className={`${styles.fileInput} `}
              type="file"
              accept=".xlsx, .xls, .csv"
              id="fileUpload"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  const fileExtension = file.name
                    .split(".")
                    .pop()
                    .toLowerCase();
                  const allowedExtensions = ["xlsx", "xls", "csv"];

                  if (!allowedExtensions.includes(fileExtension)) {
                    toast.error(
                      "Invalid file type! Please upload an Excel or CSV file."
                    );
                    return;
                  }
                  readExcel(file);
                }
              }}
            />
          </Col>
          <Col>
            <Button
              variant="success"
              disabled={task.length == 0}
              onClick={uploadHandler}
            >
              Upload Task
            </Button>
          </Col>
        </Row>

        <Row>
          <Table hover size="sm" className="mt-4">
            {/* TABLE HEADING START */}
            <thead className={`${styles.tableHeading}`}>
              <tr>
                <th className={`${styles.headSno}`}>S. No.</th>
                <th className={`${styles.headName}`}>First Name</th>
                <th className={`${styles.headDesc}`}>Phone</th>
                <th className={`${styles.headTitle}`}>Task Name</th>
              </tr>
            </thead>

            {/* // TABLE BODY START */}
            <tbody className={`${styles.tableBody}`}>
              {task.length > 0 ? (
                task.map((data, i) => (
                  <tr className="align-middle" key={i}>
                    <td>{data?.SNo}</td>
                    <td>{data?.firstName}</td>
                    <td>{data?.phone}</td>
                    <td>{data?.notes}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className={styles.noUser}>
                    No Tasks Available
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </Row>
      </Container>
    </Layout>
  );
};

export default TaskCreation;
