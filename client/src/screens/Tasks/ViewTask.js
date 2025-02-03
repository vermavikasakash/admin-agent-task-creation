import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { getTasksFunction } from "../../serviceApi/registerApi";
import styles from "../AgentScreen/AgentCreation.module.css";

const ViewTask = () => {
  const [task, setTask] = useState([]);

  const getTasks = async () => {
    let result = await getTasksFunction();
    console.log("results", result);
    if (result?.status == 200) {
      setTask(result?.data?.task);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  // ! JSX START

  return (
    <>
      {" "}
      <p className={styles.top_heading}> Tasks</p>
      <Container md>
        <Row className={styles.top_row}>
          <Col xs={3} className={styles.top_col}>
            User Name
          </Col>

          <Col xs={3} className={styles.top_col}>
            Mobile No.
          </Col>

          <Col xs={3} className={styles.top_col}>
            Task
          </Col>
          <Col xs={3} className={styles.top_col}>
            Assigned to
          </Col>
        </Row>

        {/* //? AGENT LIST */}
        {task?.length !== 0 &&
          task?.map((data, i) => {
            return (
              <>
                <Row
                  className={
                    i % 2 == 0 ? styles.details_row : styles.details_row2
                  }
                >
                  <Col xs={3} className={styles.top_col}>
                    {data?.firstName}
                  </Col>

                  <Col xs={3} className={styles.top_col}>
                    {data?.phone || "-"}
                  </Col>

                  <Col xs={3} className={styles.top_col}>
                    {data?.notes}
                  </Col>

                  <Col xs={3} className={styles.top_col}>
                    {data?.agentName}
                  </Col>
                </Row>
              </>
            );
          })}
      </Container>
    </>
  );
};

export default ViewTask;
