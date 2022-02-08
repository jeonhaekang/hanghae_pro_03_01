import React from "react";
import Card from "../components/Card";
import { Grid, Button } from "../elements/Index";
import { actionCreators as postActions } from "../redux/modules/post";
import { useDispatch, useSelector } from "react-redux";
import InfinityScroll from "../share/InfinityScroll";
import { history } from "../redux/configureStore";
import Permit from "../share/Permit";

const Main = (props) => {
  const dispatch = useDispatch();
  const post_list = useSelector((state) => state.post.list);

  const is_loading = useSelector((state) => state.post.is_loading);
  const paging = useSelector((state) => state.post.paging);

  //console.log(is_loading, paging.next);
  React.useEffect(() => {
    dispatch(postActions.postLoadFB());
  }, []);
  return (
    <Grid>
      <InfinityScroll
        callNext={() => {
          dispatch(postActions.postLoadFB(paging.next));
        }}
        is_next={paging.next ? true : false}
        loading={is_loading}
      >
        {post_list.map((post, i) => {
          return (
            <Grid key={i}>
              <Card {...post} />
            </Grid>
          );
        })}
      </InfinityScroll>
      <Permit>
        <Button
          shape="edit"
          _onClick={() => {
            history.push("/post");
          }}
        >
          +
        </Button>
      </Permit>
    </Grid>
  );
};

Main.defaultProps = {};

export default Main;
