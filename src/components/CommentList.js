import React from "react";
import { Grid, Image, Text } from "../elements/Index";

const CommentList = (props) => {
  return (
    <Grid>
      <CommentItem />
      <CommentItem />
      <CommentItem />
      <CommentItem />
      <CommentItem />
      <CommentItem />
    </Grid>
  );
};

const CommentItem = (props) => {
  const { user_profile, user_name, user_id, post_id, contents, insert_dt } =
    props;
  return (
    <Grid is_flex>
      <Grid is_flex width="auto">
        <Image shape="circle" />
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
  user_profile: "",
  user_name: "godgooddog",
  user_id: "",
  post_id: 1,
  contents: "마 니 서마터폰 중독이가?",
  insert_dt: "2021-01-01 19:00:00",
};

export default CommentList;
