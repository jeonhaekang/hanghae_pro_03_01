import React from "react";
import styled from "styled-components";
import { IoHeart } from "react-icons/io5";

import { Grid, Image, Text, Button } from "../elements/Index";

const Card = (props) => {
  const { user_profile, user_name, insert_dt, contents, cmt_cnt, like_cnt } =
    props;
  return (
    <Grid border="1px solid #cbcbcb " padding="15px" margin="30px 0" bg="white">
      <Grid is_flex>
        <Grid is_flex width="auto">
          <Image shape="circle" />
          <Text>{user_name}</Text>
        </Grid>
        <Text>{insert_dt}</Text>
      </Grid>

      <Grid>
        <Text margin="16px 0">{contents}</Text>
      </Grid>

      <Grid>
        <Image />
      </Grid>

      <Grid is_flex>
        <Grid is_flex width="auto">
          <Text margin="5px">좋아요 {like_cnt}</Text>
          <Text margin="5px">덧글 {cmt_cnt}</Text>
        </Grid>
        <Button shape="heart">
          <IoHeart />
        </Button>
      </Grid>
    </Grid>
  );
};

Card.defaultProps = {
  user_profile: "",
  user_name: "godgooddog",
  insert_dt: "2021-01-01",
  contents: "마 니 서마터폰 중독이다.",
  cmt_cnt: "9",
  like_cnt: "10",
};

export default Card;
