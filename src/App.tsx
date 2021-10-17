import React, { FC } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import loadable from "@loadable/component";
import "./App.css";
import { Layout } from "antd";
import dayjs from "dayjs";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HeaderComponent from "./components/HeaderComponent";
import { AuthProvider } from "./context/AuthContext";
import { Container } from "./styles/CommonStyles";
const Home = loadable(() => import("./pages/Home"));
const Login = loadable(() => import("./pages/Login"));
const SignUp = loadable(() => import("./pages/SignUp"));
const Blog = loadable(() => import("./pages/Blog"));
const Profile = loadable(() => import("./pages/Profile"));
const { Footer, Content } = Layout;

const App: FC = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Layout>
            <HeaderComponent />
            <Content>
              <Container>
                <Switch>
                  <Route path="/blog">
                    <Blog />
                  </Route>
                  <Route exact path="/profile">
                    <Profile />
                  </Route>
                  <Route exact path="/signup">
                    <SignUp />
                  </Route>
                  <Route exact path="/login">
                    <Login />
                  </Route>
                  <Route path="/">
                    <Home />
                  </Route>
                </Switch>
              </Container>
            </Content>
            <Footer style={{ textAlign: "center" }}>
              Copyright &copy; {dayjs().format("YYYY")}{" "}
            </Footer>
          </Layout>
          <ToastContainer />
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
