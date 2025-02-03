import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { getAgentsFunction } from "../../serviceApi/registerApi";
import styles from "./AgentCreation.module.css";
import Layout from "../../components/Layout/Layout";

const ViewAgent = () => {
  const [agents, setAgents] = useState([]);

  const getAgents = async () => {
    let result = await getAgentsFunction();
    console.log("results", result);
    if (result?.status == 200) {
      setAgents(result?.data?.agent);
    }
  };

  useEffect(() => {
    getAgents();
  }, []);

  // ! JSX START

  return (
    <Layout>
      {" "}
      <p className={styles.top_heading}>View Agents</p>
      <Container md>
        <Row className={styles.top_row}>
          <Col xs={3} className={styles.top_col}>
            Agent Name
          </Col>
          <Col xs={3} className={styles.top_col}>
            Email id
          </Col>
          <Col xs={3} className={styles.top_col}>
            Mobile No.
          </Col>
          <Col xs={3} className={styles.top_col}>
            Created on
          </Col>
        </Row>

        {/* //? AGENT LIST */}
        {agents?.length !== 0 &&
          agents?.map((data, i) => {
            return (
              <>
                <Row
                  className={
                    i % 2 == 0 ? styles.details_row : styles.details_row2
                  }
                >
                  <Col xs={3} className={styles.top_col}>
                    {data?.name}
                  </Col>
                  <Col xs={3} className={styles.top_col}>
                    {data?.email}
                  </Col>
                  <Col xs={3} className={styles.top_col}>
                    {data?.phone || "-"}
                  </Col>
                  <Col xs={3} className={styles.top_col}>
                    {data?.createdAt}
                  </Col>
                </Row>
              </>
            );
          })}
      </Container>
    </Layout>
  );
};

export default ViewAgent;
