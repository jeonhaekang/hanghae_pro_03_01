import React from "react";
import { Grid, Image, Text, Input, Button } from "../elements/Index";

const Post = (props) => {
  return (
    <Grid border="1px solid #cbcbcb " padding="15px" margin="30px 0" bg="white">
      <Text size="30px">게시글 작성</Text>
      <Input type="file"></Input>
      <Text size="20px">미리보기</Text>
      <Image />
      <Text size="20px">본문</Text>
      <Input testArea></Input>
      <Button width="100%" padding="10px">게시글 작성</Button>
    </Grid>
  );
};

export default Post;
