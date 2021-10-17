import React, { FC, useCallback, useContext } from "react";
import { Button, Col, Row, Menu } from "antd";
import { Header } from "antd/lib/layout/layout";
import { Link, useHistory } from "react-router-dom";
import { auth } from "../firebase/fb";
import { signOut } from "firebase/auth";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import UserAvatar from "./UserAvatar";

const HeaderComponent: FC = () => {
  const user = useContext(AuthContext);
  const history = useHistory();
  const logOut = useCallback(() => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        history.push("/");
      })
      .catch((error) => {
        // An error happened.
        toast(error.message);
      });
  }, [history]);
  return (
    <Header>
      <Row justify="space-between">
        <Col span={4}>
          <h1>
            <Link to="/">PUBLISHERGUIDE</Link>
          </h1>
        </Col>
        <Col span={8}>
          <Menu theme="dark" mode="horizontal">
            <Menu.Item>
              <Link to="/">Home</Link>
            </Menu.Item>
            <Menu.Item>
              <Link to="/profile">Profile</Link>
            </Menu.Item>
            <Menu.Item>
              <Link to="/blog/list">Blog</Link>
            </Menu.Item>
          </Menu>
        </Col>

        {!user ? (
          <>
            <Col span={2}>
              <Button type="link">
                <Link to="/login">LOGIN</Link>
              </Button>
            </Col>
            <Col span={2}>
              <Button type="primary">
                <Link to="/signup">SIGNUP</Link>
              </Button>
            </Col>
          </>
        ) : (
          <>
            <Col span={2}>
              <UserAvatar />
            </Col>
            <Col span={4}>
              <Button type="link" onClick={logOut}>
                LOGOUT
              </Button>
            </Col>
          </>
        )}
      </Row>
    </Header>
  );
};

export default HeaderComponent;
