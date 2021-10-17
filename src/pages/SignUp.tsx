import React, { useCallback, useState } from "react";
import { Input, Col, Row, Button, Typography } from "antd";
import {
  UserOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
  LockOutlined,
} from "@ant-design/icons";
// import { createUser } from "../firebase/fb";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";
import { auth } from "../firebase/fb";
const { Text } = Typography;
const SignUp = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [isEqual, setIsEqual] = useState(true);
  const handleEmail = useCallback((e) => {
    setEmail(e.target.value);
  }, []);
  const handleName = useCallback((e) => {
    setName(e.target.value);
  }, []);
  const handlePassword = useCallback((e) => {
    setPassword(e.target.value);
  }, []);
  const handlePasswordConfirm = useCallback(
    (e) => {
      setPasswordConfirm(e.target.value);
      if (password !== e.target.value) {
        setIsEqual(false);
      } else {
        setIsEqual(true);
      }
    },
    [password]
  );
  const handleSignup = useCallback(() => {
    if (email && password && passwordConfirm) {
      if (isEqual) {
        return createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            //   // Signed in
            //   // const user = userCredential.user;
            //   // ...
            //   return cb(userCredential);
            console.log(userCredential);
          })
          .catch((error) => {
            toast(error.message);
            //   // const errorCode = error.code;
            //   // const errorMessage = error.message;
            //   // ..
            //   return handleError(error);
          });
      } else {
        return toast("비밀번호가 일치하지 않습니다.");
      }
    } else {
      return toast("입력양식을 확인하세요.");
    }
  }, [email, isEqual, password, passwordConfirm]);

  return (
    <>
      <Row justify="center">
        <Col span={8}>
          <Row justify="center">
            <Col>
              <h2>SignUp</h2>
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
              <Input
                value={name}
                onChange={handleName}
                size="large"
                placeholder="NAME"
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
              <Text type="secondary">
                비밀번호는 8~20자의 영문대소문자,숫자를 혼합하여 사용합니다.
              </Text>
            </div>
            <div>
              <Input.Password
                value={passwordConfirm}
                onChange={handlePasswordConfirm}
                size="large"
                placeholder="PASSWORD CONFIRM"
                prefix={<LockOutlined />}
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
              />
              {!isEqual && (
                <Text type="warning">비밀번호가 일치하지 않습니다.</Text>
              )}
            </div>
            <Button type="primary" block onClick={handleSignup}>
              SIGNUP
            </Button>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default SignUp;
