import React, { FC, useCallback, useState } from "react";
import { Input, Col, Row, Button } from "antd";
import {
  UserOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
  LockOutlined,
} from "@ant-design/icons";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/fb";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";

const Login: FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const handleEmail = useCallback((e) => {
    setEmail(e.target.value);
  }, []);
  const handlePassword = useCallback((e) => {
    setPassword(e.target.value);
  }, []);
  const handleLogin = useCallback(() => {
    if (email && password) {
      return signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          console.log(userCredential);
          history.push("/");
          // const user = userCredential.user;
          // setUser(user);
        })
        .catch((error) => {
          toast(error.message);
        });
    } else {
      return toast("입력양식을 확인하세요.");
    }
  }, [email, history, password]);
  return (
    <>
      <Row justify="center">
        <Col span={8}>
          <Row justify="center">
            <Col>
              <h2>Login</h2>
            </Col>
          </Row>
          <div>
            <div>
              <Input
                type="email"
                value={email}
                onChange={handleEmail}
                size="large"
                placeholder="ID"
                prefix={<UserOutlined />}
              />
            </div>
            <div>
              <Input.Password
                value={password}
                onChange={handlePassword}
                size="large"
                placeholder="PASSWORD"
                prefix={<LockOutlined />}
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
              />
            </div>
            <Button type="primary" block onClick={handleLogin}>
              LOGIN
            </Button>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default Login;
