import React from "react";
import { Grid, Button, Text } from "../elements/Index";
import styled from "styled-components";
import { history } from "../redux/configureStore";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";
import { apiKey } from "./firebase";
import NotiBadge from "../components/NotiBadge";

const Header = (props) => {
  const dispatch = useDispatch();
  const is_login = useSelector((state) => state.user.is_login);

  const _session_key = `firebase:authUser:${apiKey}:[DEFAULT]`;
  const is_session = sessionStorage.getItem(_session_key) ? true : false;

  if (is_login && is_session) {
    return (
      <HeaderBox>
        <Grid is_flex padding="10px" border="1px solid #cbcbcb -bottom">
          <Grid width="auto" _onClick={() => history.push("/")}>
            <Text size="25px" margin="0">
              갱얼쥐클럽
            </Text>
          </Grid>

          <Grid width="auto">
            <NotiBadge _onClick={() => history.push("/alert")}></NotiBadge>

            <Button
              padding="10px"
              margin="5px"
              _onClick={() => dispatch(userActions.logoutFB())}
            >
              로그아웃
            </Button>
          </Grid>
        </Grid>
      </HeaderBox>
    );
  }

  return (
    <HeaderBox>
      <Grid is_flex padding="10px" border="1px solid #cbcbcb -bottom">
        <Grid width="auto">
          <Text size="25px" margin="0">
            갱얼쥐클럽
          </Text>
        </Grid>
        <Grid width="auto">
          <Button
            padding="10px"
            margin="5px"
            _onClick={() => history.push("/signup")}
          >
            회원가입
          </Button>
          <Button
            padding="10px"
            margin="5px"
            _onClick={() => history.push("/login")}
          >
            로그인
          </Button>
        </Grid>
      </Grid>
    </HeaderBox>
  );
};

Header.defaultProps = {};

const HeaderBox = styled.div`
  width: 100%;
  position: fixed;
  z-index: 1;
  background-color: white;
  left: 0;
  top: 0;
`;

export default Header;
