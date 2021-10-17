import React, { FC } from "react";
import { Button, Typography } from "antd";
import { Link, Route, Switch } from "react-router-dom";
import loadable from "@loadable/component";
const BlogCreate = loadable(() => import("../components/BlogCreate"));
const BlogList = loadable(() => import("../components/BlogList"));

/*interface BlogDocument {
  content?: string;
  createdAt?: Date;
  enabled?: boolean;
  title?: string;
  writer?: string;
}*/
const { Title } = Typography;
const Blog: FC = () => {
  return (
    <>
      <Title level={2}>BLOG</Title>
      <Button type="primary">
        <Link to="/blog/create">글쓰기</Link>
      </Button>
      <Switch>
        <Route path="/blog/create">
          <BlogCreate />
        </Route>
        <Route path="/blog/list">
          <BlogList />
        </Route>
      </Switch>
    </>
  );
};

export default Blog;
