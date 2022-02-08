import styled from "styled-components";
import { Route } from "react-router-dom";
import { history } from "../redux/configureStore";

import Header from "./Header";
import { Main, Login, Signup, Post, Detail, Alert } from "../pages/index";
import { Grid, Button } from "../elements/Index";
import { ConnectedRouter } from "connected-react-router";
import React from "react";
import { actionCreators as userAction } from "../redux/modules/user";
import { useDispatch } from "react-redux";
import { apiKey } from "./firebase";
import Permit from "./Permit";

function App() {
  const dispatch = useDispatch();

  const _session_key = `firebase:authUser:${apiKey}:[DEFAULT]`;
  const is_session = sessionStorage.getItem(_session_key) ? true : false;

  React.useEffect(() => {
    if (is_session) {
      dispatch(userAction.loginCheckFB());
    }
  });
  return (
    <Wrap>
      <Header />
      <ContentWrap>
        <Grid padding="80px 0 0 0">
          <ConnectedRouter history={history}>
            <Route path="/" component={Main} exact />
            <Route path="/login" component={Login} exact />
            <Route path="/signup" component={Signup} exact />
            <Route path="/detail/:id?" component={Detail} exact />
            <Route path="/post/:id?" component={Post} exact />
            <Route path="/alert" component={Alert} exact />
          </ConnectedRouter>
        </Grid>
      </ContentWrap>
      {/* <Permit>
        <Button
          shape="edit"
          _onClick={() => {
            history.push("/post");
          }}
        >
          +
        </Button>
      </Permit> */}
    </Wrap>
  );
}
const Wrap = styled.div`
  background-color: #ffefe6;
  min-height: 100vh;
  height: 100%;
`;

const ContentWrap = styled.div`
  max-width: 700px;
  margin: auto;
  position: relative;
  box-sizing: border-box;
  overflow: hidden;
`;

export default App;
