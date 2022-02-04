import React from "react";
import { Grid, Text, Input, Button } from "../elements/Index";
import { useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";
import { emailCheck } from "../share/common";

const Signup = (props) => {
  const dispatch = useDispatch();

  const [id, changeId] = React.useState("");
  const [pwd, chagnePwd] = React.useState("");
  const [pwdCheck, chagnePwdCheck] = React.useState("");
  const [name, chagneName] = React.useState("");

  const signup = () => {
    if (id === "" || pwd === "" || name === "") {
      return window.alert("정보를 모두 입력해 주세요.");
    }
    if (!emailCheck(id)) {
      window.alert("이메일 형식이 맞지 않습니다.");
      return;
    }
    if (pwd !== pwdCheck) {
      return window.alert("비밀번호 확인이 다릅니다.");
    }

    dispatch(userActions.signupFB(id, pwd, name));
  };

  return (
    <Grid border="1px solid #cbcbcb " padding="15px" margin="30px 0" bg="white">
      <Text size="30px">회원가입</Text>
      <Grid>
        <Input
          placeholder="아이디를 입력해주세요."
          _onChange={(e) => changeId(e.target.value)}
          label="아이디"
        />
      </Grid>
      <Grid margin="20px 0">
        <Input
          placeholder="닉네임을 입력해주세요."
          _onChange={(e) => chagneName(e.target.value)}
          label="닉네임"
        />
      </Grid>
      <Grid margin="20px 0">
        <Input
          type="password"
          placeholder="패스워드를 입력해주세요."
          _onChange={(e) => chagnePwd(e.target.value)}
          label="패스워드"
        />
      </Grid>
      <Grid margin="20px 0">
        <Input
          type="password"
          placeholder="패스워드를 다시 입력해주세요."
          _onChange={(e) => chagnePwdCheck(e.target.value)}
          label="패스워드 확인"
        />
      </Grid>
      <Grid>
        <Button _onClick={signup} width="100%" padding="10px">
          회원가입
        </Button>
      </Grid>
    </Grid>
  );
};

Signup.defaultProps = {};

export default Signup;
