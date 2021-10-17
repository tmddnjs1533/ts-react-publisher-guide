import React, { FC, useContext } from "react";
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { AuthContext } from "../context/AuthContext";
const UserAvatar: FC = () => {
  const user = useContext(AuthContext);
  console.log(user);
  if (!user) return null;
  return (
    <>
      {user.photoURL ? (
        <Avatar src={user.photoURL} />
      ) : (
        <Avatar icon={<UserOutlined />} />
      )}
    </>
  );
};

export default UserAvatar;
