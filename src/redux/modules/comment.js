import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import "moment";
import moment from "moment";
import { db } from "../../share/firebase";
import firebase from "firebase/compat/app";
import { actionCreators as postActions } from "./post";
import { getDatabase, ref, set, push, update } from "firebase/database";
import {
  collection,
  query,
  where,
  orderBy,
  getDocs,
  addDoc,
  doc,
  updateDoc,
  increment,
} from "firebase/firestore";

const SET_COMMENT = "SET_COMMENT";
const ADD_COMMENT = "ADD_COMMENT";

const LOADING = "LOADING";

const setComment = createAction(SET_COMMENT, (post_id, comment_list) => ({
  post_id,
  comment_list,
}));
const addComment = createAction(ADD_COMMENT, (post_id, comment) => ({
  post_id,
  comment,
}));

const loading = createAction(LOADING, (is_loading) => ({ is_loading }));

const initialState = {
  list: {},
  is_loading: false,
};

const addCommentFB = (post_id, contents) => {
  return async function (dispatch, getState, { history }) {
    const user_info = getState().user.user;
    let comment = {
      post_id: post_id,
      user_id: user_info.uid,
      user_name: user_info.user_name,
      user_profile: user_info.user_profile,
      contents: contents,
      insert_dt: moment().format("YYYY-MM-DD hh:mm:ss"),
    };
    console.log(comment);

    await addDoc(collection(db, "comment"), comment).then((p) => {
      const post = getState().post.list.find((l) => l.id === post_id);

      comment = { ...comment, id: p.id };
      const upDoc = doc(db, "post", post_id);
      updateDoc(upDoc, {
        comment_cnt: increment(1),
      }).then(() => {
        dispatch(addComment(post_id, comment));
        console.log(post_id);
        if (post) {
          console.log("진입");
          dispatch(
            postActions.postEdit(post_id, {
              comment_cnt: parseInt(post.comment_cnt) + 1,
            })
          );

          console.log(user_info.uid, post.user_info.user_id);
          const db = getDatabase();
          const dbRef = ref(db, `noti/${post.user_info.user_id}/list`);
          if (user_info.uid !== post.user_info.user_id) {
            const noti_item = push(dbRef);

            set(noti_item, {
              post_id: post.id,
              user_name: comment.user_name,
              image_url: post.image_url,
              insert_dt: comment.insert_dt,
            }).then(() => {
              update(ref(db, `noti/${post.user_info.user_id}`), {
                read: false,
              });
            });
          }
        }
      });
    });
  };
};

const getCommentFB = (post_id = null) => {
  return async function (dispatch, getState, { history }) {
    if (!post_id) {
      return;
    }

    const q = query(
      collection(db, "comment"),
      where("post_id", "==", post_id),
      orderBy("insert_dt", "desc")
    );

    await getDocs(q)
      .then((docs) => {
        console.log(docs);
        let list = [];

        docs.forEach((doc) => {
          list.push({ ...doc.data(), id: doc.id });
        });

        dispatch(setComment(post_id, list));
      })
      .catch((error) => {
        console.log("댓글 오류", error);
      });
  };
};

export default handleActions(
  {
    [SET_COMMENT]: (state, action) =>
      produce(state, (draft) => {
        draft.list[action.payload.post_id] = action.payload.comment_list;
        // let data = {[post_id]: com_list, ...}
      }),
    [ADD_COMMENT]: (state, action) =>
      produce(state, (draft) => {
        draft.list[action.payload.post_id].unshift(action.payload.comment);
      }),
    [LOADING]: (state, action) =>
      produce(state, (draft) => {
        draft.is_loading = action.payload.is_loading;
      }),
  },
  initialState
);

const actionCreators = {
  getCommentFB,
  setComment,
  addComment,
  addCommentFB,
};

export { actionCreators };
