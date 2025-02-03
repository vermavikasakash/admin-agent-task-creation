import React, { useState } from "react";
import Layout from "../../components/Layout/Layout"
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import styles from "./AgentCreation.module.css";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { registerFunction } from "../../serviceApi/registerApi";

const AgentCreation = () => {
  // state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  //form handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    const packageInfo = {
      name,
      email,
      phone,
      password,
    };
    const result = await registerFunction(packageInfo);

    if (result.data.success) {
      toast.success(result.data.message);
      setTimeout(() => {
        navigate("/view-agent");
      }, 2000);
    } else {
      toast.error(result.data.message);
    }
  };

  // ! JSX START
  return (
    <Layout>
      <div className={styles.register}>
        <h1>AgentCreation</h1>
        <Form style={{ width: "30%" }} onSubmit={(e) => handleSubmit(e)}>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Please Enter Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Please Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Mobile</Form.Label>

            <PhoneInput
              country={"in"} // Default country (India)
              value={phone}
              onChange={(value) => setPhone(value)}
              inputStyle={{ width: "100%", height: "40px" }}
              enableSearch={true} // Enables country search
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </Layout>
  );
};

export default AgentCreation;
