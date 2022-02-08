import React from "react";
import styled from "styled-components";
import { IoHeart } from "react-icons/io5";

import { Grid, Image, Text, Button, Layout } from "../elements/Index";
import { useSelector } from "react-redux";
import { history } from "../redux/configureStore";

const Card = (props) => {
  const {
    id,
    image_url,
    user_info,
    insert_dt,
    contents,
    like_cnt,
    comment_cnt,
    layout,
  } = props;

  let login_user = useSelector((state) => state.user.user);
  login_user = login_user !== null ? login_user.uid : login_user;

  return (
    <Grid border="1px solid #cbcbcb " padding="15px" margin="30px 0" bg="white">
      <Grid is_flex>
        <Grid is_flex width="auto">
          <Image shape="circle" />
          <Text>{user_info.user_name}</Text>
        </Grid>
        <Grid is_flex width="auto">
          <Text>{insert_dt}</Text>
          {login_user === user_info.user_id ? (
            <Button _onClick={() => history.push("/post/" + id)} padding="5px">
              수정
            </Button>
          ) : (
            ""
          )}
        </Grid>
      </Grid>

      <Layout content={contents} preview={image_url} layout={layout} />

      <Grid is_flex>
        <Grid is_flex width="auto">
          <Text margin="5px">좋아요 {like_cnt}</Text>
          <Text margin="5px">덧글 {comment_cnt}</Text>
        </Grid>
        <Button shape="heart">
          <IoHeart />
        </Button>
      </Grid>
    </Grid>
  );
};

Card.defaultProps = {
  user_info: {
    user_name: "닉네임",
    user_profile:
      "https://post-phinf.pstatic.net/MjAyMTAxMDZfMjk2/MDAxNjA5OTEzNjQyNzI4.pVfbKb6qt51qbGXNn8EPhAv4DuWslBW_XD_wybwftO8g.lwIH8DlKoLuwJvEOwrXlY_NxxX-ymTMrbAuOV8mDFMEg.JPEG/9999.jpg?type=w1200",
  },
  image_url:
    "https://t1.daumcdn.net/liveboard/linkagelab/f0a375712a0946dabbbea47372a4c1d4.jpg",
  contents: "본문",
  comment_cnt: 0,
  like_cnt: 0,
  insert_dt: "2021-02-27 10:00:00",
  layout: "bottom",
};

export default Card;
