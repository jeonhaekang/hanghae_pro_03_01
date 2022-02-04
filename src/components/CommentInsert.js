import React from "react";
import Button from "../elements/Button";
import Grid from "../elements/Grid";
import Input from "../elements/Input";

const CommentInsert = (props) => {
  return (
    <Grid is_flex>
      <Input placeholder="내용을 입력하세요." />
      <Button padding="10px" width="50px">
        작성
      </Button>
    </Grid>
  );
};

export default CommentInsert;
