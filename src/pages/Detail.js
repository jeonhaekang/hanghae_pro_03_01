import React from "react";
import Card from "../components/Card";
import CommentInsert from "../components/CommentInsert";
import CommentList from "../components/CommentList";
import Grid from "../elements/Grid";

const Detail = (props) => {
  return (
    <React.Fragment>
      <Card />
      <Grid bg="white" padding="20px" border="1px solid #cbcbcb ">
        <CommentInsert />
        <CommentList />
      </Grid>
    </React.Fragment>
  );
};

export default Detail;
