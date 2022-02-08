import React from "react";
import { Grid, Image, Text } from "../elements/Index";
import { history } from "../redux/configureStore";

const AlertCard = (props) => {
  const { image_url, insert_dt, post_id, user_name } = props;
  return (
    <Grid
      _onClick={() => {
        history.push(`/detail/${post_id}`);
      }}
      is_flex
      bg="white"
      border="1px solid #cbcbcb "
      padding="16px"
    >
      <Image width="100px" src={image_url} />
      <Grid is_flex width="auto">
        <Text bold="700">{user_name}</Text>
        <Text>님이 게시글에 댓글을 남겼습니다.</Text>
      </Grid>
    </Grid>
  );
};

AlertCard.defaultProps = {};

export default AlertCard;
