import React, { useState } from "react";
import { IoHeart, IoHeartOutline } from "react-icons/io5";

import { Grid, Image, Text, Button, Layout } from "../elements/Index";
import Permit from "../share/Permit";
import { useDispatch, useSelector } from "react-redux";
import { history } from "../redux/configureStore";
import { likeFB } from "../redux/modules/post";
import { getDatabase, ref, onValue, update } from "firebase/database";

const Card = (props) => {
  const dispatch = useDispatch();
  const [like, setLike] = useState(false);
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

  let user = useSelector((state) => state.user.user);

  let login_user = useSelector((state) => state.user.user);
  login_user = login_user !== null ? login_user.uid : login_user;
  
  React.useEffect(() => {
    if (user?.uid) {
      const db = getDatabase();
      const likeRef = ref(db, `like/${id}/${user.uid}`);

      onValue(likeRef, (snapshot) => {
        if (snapshot.val()) {
          setLike(snapshot.val()?.state);
        } else {
          update(likeRef, { state: false });
        }
      });
    } else {
      return false;
    }
  }, [user]);

  const likeAction = () => {
    dispatch(likeFB(id, like, like_cnt));
  };

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

      <Grid
        _onClick={() => {
          history.push(`/detail/${id}`);
        }}
      >
        <Layout content={contents} preview={image_url} layout={layout} />
      </Grid>

      <Grid is_flex>
        <Grid is_flex width="auto">
          <Text margin="5px">좋아요 {like_cnt}</Text>
          <Text margin="5px">덧글 {comment_cnt}</Text>
        </Grid>
        <Permit>
          <Button _onClick={likeAction} shape="heart">
            {like ? <IoHeart /> : <IoHeartOutline />}
          </Button>
        </Permit>
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
