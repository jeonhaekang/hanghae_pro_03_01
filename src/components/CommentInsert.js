import React from "react";
import { useDispatch } from "react-redux";
import Button from "../elements/Button";
import Grid from "../elements/Grid";
import Input from "../elements/Input";

import { actionCreators as commentActions } from "../redux/modules/comment";

const CommentInsert = (props) => {
  const dispatch = useDispatch();

  const [comment_text, setCommentText] = React.useState();
  const { post_id } = props;
  const onChange = (e) => {
    setCommentText(e.target.value);
  };

  const write = () => {
    console.log(comment_text);
    dispatch(commentActions.addCommentFB(post_id, comment_text));
    setCommentText("");
  };

  return (
    <Grid is_flex>
      <Input
        value={comment_text}
        placeholder="내용을 입력하세요."
        _onChange={onChange}
        onSubmit={write}
      />
      <Button _onClick={write} padding="10px" width="50px">
        작성
      </Button>
    </Grid>
  );
};

export default CommentInsert;
