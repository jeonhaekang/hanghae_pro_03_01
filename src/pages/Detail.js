import React from "react";
import Card from "../components/Card";
import CommentInsert from "../components/CommentInsert";
import CommentList from "../components/CommentList";
import Grid from "../elements/Grid";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";
import Permit from "../share/Permit";

const Detail = (props) => {
  const dispatch = useDispatch();
  const id = props.match.params.id;

  const post_list = useSelector((state) => state.post.list);
  const post_idx = post_list.findIndex((p) => p.id === id);
  let post = post_list[post_idx];

  React.useEffect(() => {
    if (post) {
      return;
    }

    dispatch(postActions.getOnePostFB(id));
  }, []);

  return (
    <React.Fragment>
      {post && <Card {...post} />}

      <Grid bg="white" padding="20px" border="1px solid #cbcbcb ">
        <Permit>
          <CommentInsert post_id={id} />
        </Permit>
        <CommentList post_id={id} />
      </Grid>
    </React.Fragment>
  );
};

export default Detail;
