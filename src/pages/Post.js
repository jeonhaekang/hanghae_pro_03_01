import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Image, Text, Input, Button, Layout } from "../elements/Index";
import { actionCreators as postActions } from "../redux/modules/post";
import { actionCreators as imageActions } from "../redux/modules/image";
import { history } from "../redux/configureStore";
import Upload from "../share/Upload";

const Post = (props) => {
  const dispatch = useDispatch();
  const is_login = useSelector((state) => state.user.is_login);
  const preview = useSelector((state) => state.image.preview);
  const is_edit = props.match.params.id;

  let _post = useSelector((state) => state.post.list).find(
    (el) => is_edit === el.id
  );

  const [layout, setLayout] = useState("bottom");
  const [content, setContent] = React.useState(_post ? _post.contents : "");

  React.useEffect(() => {
    if (is_edit && !_post) {
      console.log("포스트 정보가 없어요!");
      history.goBack();

      return;
    }

    if (is_edit) {
      dispatch(imageActions.setPreivew(_post.image_url));
    }
  }, []);

  const postSet = () => {
    console.log("작성");
    dispatch(postActions.postSetFB(content, layout));
  };

  const postModify = () => {
    dispatch(
      postActions.editFB(_post.id, { contents: content, layout: layout })
    );
  };

  const select = (e) => {
    setLayout(e.target.value);
  };

  if (is_login) {
    return (
      <Grid
        border="1px solid #cbcbcb "
        padding="15px"
        margin="30px 0"
        bg="white"
      >
        <Text size="30px">{is_edit ? "게시글 수정" : "게시글 작성"}</Text>
        <Upload />
        <Text size="20px">미리보기</Text>
        <select onChange={select}>
          <option value="bottom">하단</option>
          <option value="left">왼쪽</option>
          <option value="right">오른쪽</option>
        </select>
        <Layout content={content} preview={preview} layout={layout} />
        <Text size="20px">본문</Text>
        <Input
          value={content}
          _onChange={(e) => setContent(e.target.value)}
          testArea
        ></Input>
        {is_edit ? (
          <Button _onClick={postModify} width="100%" padding="10px">
            게시글 수정
          </Button>
        ) : (
          <Button _onClick={postSet} width="100%" padding="10px">
            게시글 작성
          </Button>
        )}
      </Grid>
    );
  }

  return (
    <Grid border="1px solid #cbcbcb " padding="15px" margin="30px 0" bg="white">
      <Text size="30px">비정상적인 접근입니다.</Text>
      <Button
        _onClick={() => {
          history.replace("/");
        }}
        width="100%"
        padding="10px"
      >
        메인으로
      </Button>
    </Grid>
  );
};

export default Post;
