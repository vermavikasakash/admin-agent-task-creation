import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { toast } from "react-toastify";
import { loginFunction } from "../../../serviceApi/registerApi";
import { useNavigate } from "react-router-dom";
import styles from "../../AgentScreen/AgentCreation.module.css";
import Layout from "../../../components/Layout/Layout";

const Login = () => {
  // state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  //form handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    const packageInfo = {
      email,
      password,
    };
    const result = await loginFunction(packageInfo);

    if (result.status == 200) {
      if (result.data.status) {
        localStorage.setItem("role", JSON.stringify(result.data.user.role));
        localStorage.setItem("user", JSON.stringify(result.data));
        toast.success(result.data.message);
        setTimeout(() => {
          navigate("/home-page");
        }, 1000);
      } else toast.error(result.data.message);
    } else {
      toast.error(result.response.data.message);
    }
  };

  return (
    <Layout>
      <div className={styles.register}>
        <h1>Login</h1>
        <Form style={{ width: "30%" }} onSubmit={(e) => handleSubmit(e)}>
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
          <div className={styles.login_bottom_btn}>
            <Button variant="primary" type="submit">
              Login
            </Button>
            {/* <Button
            variant="primary"
            onClick={() => navigate("/register")}
          >
            Sign up
            </Button> */}
          </div>
        </Form>
      </div>
    </Layout>
  );
};

export default Login;
