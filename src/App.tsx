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
const Home = loadable(() => import("./pages/Home"));
const Login = loadable(() => import("./pages/Login"));
const SignUp = loadable(() => import("./pages/SignUp"));
const { Footer, Content } = Layout;

const App: FC = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Layout>
            <HeaderComponent />
            <Content>
              <Switch>
                {/*<Route path="/about">*/}
                {/*  <About />*/}
                {/*</Route>*/}
                {/*<Route path="/users">*/}
                {/*  <Users />*/}
                {/*</Route>*/}
                <Route path="/signup">
                  <SignUp />
                </Route>
                <Route path="/login">
                  <Login />
                </Route>
                <Route path="/">
                  <Home />
                </Route>
              </Switch>
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
