import { Check } from "@material-ui/icons";
import React from "react";
import { useDispatch } from "react-redux";
import { Grid, Text, Input, Button } from "../elements/Index";
import { history } from "../redux/configureStore";
import { actionCreators as userActions } from "../redux/modules/user";
import { emailCheck } from "../share/common";

const Login = (props) => {
  const dispatch = useDispatch();
  const [id, changeId] = React.useState("");
  const [pwd, chagnePwd] = React.useState("");
  const [loginCheck, setLogin] = React.useState(true);

  const login = () => {
    if (id === "" || pwd === "") {
      window.alert("공백채워 임마");
      return;
    }

    if (!emailCheck(id)) {
      window.alert("이메일 형식이 맞지 않습니다.");
      return;
    }
    dispatch(userActions.loginFB(id, pwd));
  };

  const login_check = () => {
    if (id !== "" && pwd !== "") {
      setLogin(false);
    } else {
      setLogin(true);
    }
  };

  return (
    <Grid border="1px solid #cbcbcb " padding="15px" margin="30px 0" bg="white">
      <Text size="30px">로그인</Text>
      <Grid>
        <Input
          value={id}
          placeholder="아이디를 입력해주세요."
          _onKeyUp={login_check}
          _onChange={(e) => {
            changeId(e.target.value);
          }}
          label="아이디"
        />
      </Grid>
      <Grid margin="20px 0">
        <Input
          value={pwd}
          type="password"
          placeholder="패스워드를 입력해주세요."
          _onKeyUp={login_check}
          _onChange={(e) => {
            chagnePwd(e.target.value);
            login_check();
          }}
          label="패스워드"
        />
      </Grid>
      <Grid>
        <Button
          disabled={loginCheck}
          _onClick={login}
          width="100%"
          padding="10px"
        >
          로그인
        </Button>
      </Grid>
    </Grid>
  );
};

Login.defaultProps = {};

export default Login;
