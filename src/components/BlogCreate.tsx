import React, { FC, useCallback, useContext } from "react";
import { Form, Input, Button } from "antd";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase/fb";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};
/* eslint-disable no-template-curly-in-string */
const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not a valid email!",
    number: "${label} is not a valid number!",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
};
/* eslint-disable no-template-curly-in-string */
const BlogCreate: FC = () => {
  const history = useHistory();
  const user = useContext(AuthContext);
  const onFinish = useCallback(
    async (values: any) => {
      console.log(values);
      console.log(user);
      const data = {
        ...values.blog,
        createdAt: new Date(),
        enabled: true,
        writer: user?.uid,
      };
      console.log("data", data);
      try {
        const docRef = await addDoc(collection(db, "blog"), data);
        console.log("Document written with ID: ", docRef.id);
        history.push("/blog/list");
      } catch (e) {
        console.dir(e);
      }
    },
    [history, user]
  );

  return (
    <div>
      <Form
        {...layout}
        name="nest-messages"
        onFinish={onFinish}
        validateMessages={validateMessages}
      >
        <Form.Item
          name={["blog", "title"]}
          label="Title"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={["blog", "content"]}
          label="Content"
          rules={[{ required: true }]}
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default BlogCreate;
