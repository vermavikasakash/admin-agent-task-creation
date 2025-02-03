import React from "react";
import Layout from "../../components/Layout/Layout";
import { Link } from "react-router-dom";
import ViewTask from "../Tasks/ViewTask";
import styles from "../AgentScreen/AgentCreation.module.css";

const HomePage = () => {
  let role = localStorage.getItem("role");

  // console.log("role", role);

  // ! JSX START
  return (
    <Layout>
    
      <div className={styles.tabDiv}>
        <Link to={"/view-agent"} className={styles.activeTab}>
          View Agent
        </Link>
        {role == 1 && (
          <>
            <Link to={"/create-agent"} className={styles.activeTab}>
              Create Agent
            </Link>
            <Link to={"/create-task"} className={styles.activeTab}>
              Create Task
            </Link>
          </>
        )}
      </div>

      {/* //? VIEW TASK COMPONENT */}
      <ViewTask />
    </Layout>
  );
};

export default HomePage;
