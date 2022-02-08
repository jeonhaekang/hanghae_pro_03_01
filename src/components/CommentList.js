import React from "react";
import { Grid, Image, Text } from "../elements/Index";

import { useDispatch, useSelector } from "react-redux";
import { actionCreators as commentActions } from "../redux/modules/comment";

const CommentList = (props) => {
  const dispatch = useDispatch();
  const comment_list = useSelector((state) => state.comment.list);

  const { post_id } = props;

  React.useEffect(() => {
    if (!comment_list[post_id]) {
      dispatch(commentActions.getCommentFB(post_id));
    }
  }, []);

  console.log(comment_list[post_id]);

  if (!comment_list[post_id] || !post_id) {
    console.log("진입");
    return null;
  }

  return (
    <Grid>
      {comment_list[post_id].map((c) => {
        return <CommentItem key={c.id} {...c} />;
      })}
    </Grid>
  );
};

CommentList.defaultProps = {
  post_id: null,
};

const CommentItem = (props) => {
  const { user_profile, user_name, user_id, post_id, contents, insert_dt } =
    props;
  return (
    <Grid is_flex>
      <Grid is_flex width="auto">
        <Image shape="circle"/>
        <Text>{user_name}</Text>
      </Grid>
      <Grid is_flex margin="0px 4px">
        <Text>{contents}</Text>
        <Text>{insert_dt}</Text>
      </Grid>
    </Grid>
  );
};
CommentItem.defaultProps = {
  user_info: {
    user_profile: "",
    user_name: "godgooddog",
  },
  user_id: "",
  post_id: 1,
  contents: "마 니 서마터폰 중독이가?",
  insert_dt: "2021-01-01 19:00:00",
};

export default CommentList;
