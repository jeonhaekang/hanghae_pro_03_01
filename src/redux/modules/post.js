import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import {
  getDocs,
  collection,
  addDoc,
  doc,
  updateDoc,
  query,
  orderBy,
  limit,
  startAt,
  getDoc,
} from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadString,
  getDownloadURL,
} from "firebase/storage";
import { db } from "../../share/firebase";
import moment from "moment";
// action
const POST_LOAD = "POST_LOAD";
const POST_SET = "POST_SET";
const POST_EDIT = "POST_EDIT";
const LOADING = "LOADING";

// actionCreate
const postLoad = createAction(POST_LOAD, (list, paging) => ({ list, paging }));
const postSet = createAction(POST_SET, (post) => ({ post }));
const postEdit = createAction(POST_EDIT, (post_id, content) => ({
  post_id,
  content,
}));
const loading = createAction(LOADING, (is_loading) => ({ is_loading }));

// initialState
const initialState = {
  list: [],
  paging: { start: null, next: null, size: 3 },
  is_loading: false,
};

const initialPost = {
  image_url:
    "https://t1.daumcdn.net/liveboard/linkagelab/f0a375712a0946dabbbea47372a4c1d4.jpg",
  contents: "잘한다 잘한다 잘한다",
  comment_cnt: 0,
  like_cnt: 0,
  insert_dt: moment().format("YYYY-MM-DD hh:mm:ss"),
  layout: "bottom",
};

// middlewares
export const getOnePostFB = (id) => {
  return async function (dispatch, getState, { history }) {
    const postDoc = doc(db, "post", id);
    await getDoc(postDoc).then((doc) => {
      let _post = doc.data();
      let post = Object.keys(_post).reduce(
        //키 값을 배열로 만듬
        (acc, cur) => {
          if (cur.indexOf("user_") !== -1) {
            return {
              ...acc,
              user_info: { ...acc.user_info, [cur]: _post[cur] },
            };
          }
          return { ...acc, [cur]: _post[cur] };
        },
        { id: doc.id, user_info: {} }
      );

      dispatch(postLoad([post]));
    });
  };
};

export const editFB = (postId = null, content = {}) => {
  return async function (dispatch, getState, { history }) {
    if (!postId) {
      console.log("포스트가 없습니다.");
      return;
    }
    const postDoc = doc(db, "post", postId);
    const preview = getState().image.preview;
    const user = getState().user.user;

    const post_idx = getState().post.list.findIndex((el) => el.id === postId);
    const post = getState().post.list[post_idx];

    console.log(post);
    console.log(preview === post.image_url);

    if (preview === post.image_url) {
      updateDoc(postDoc, content).then(() => {
        dispatch(postEdit(postId, content));
        alert("업데이트 성공");
        history.replace("/");
      });
    } else {
      const storage = getStorage();
      const storageRef = ref(
        storage,
        `images/${user.uid}_${new Date().getTime()}`
      );

      await uploadString(storageRef, preview, "data_url")
        .then(() => {
          console.log("이미지 업로드 성공");

          getDownloadURL(storageRef)
            .then((url) => {
              console.log("이미지 로드 성공", url);
              updateDoc(postDoc, { ...content, image_url: url }).then(() => {
                dispatch(postEdit(postId, { ...content, image_url: url }));

                alert("업데이트 성공");
                history.replace("/");
              });
            })
            .catch((error) => console.log("이미지 로드 실패"));
        })
        .catch((error) => console.log("이미지 업로드 실패"));
    }
  };
};

export const postSetFB = (contents, layout) => {
  return async function (dispatch, getState, { history }) {
    const _user = getState().user.user;
    const user_info = {
      user_name: _user.user_name,
      user_profile: _user.user_profile,
      user_id: _user.uid,
    };
    let _post = {
      ...initialPost,
      contents: contents,
      insert_dt: moment().format("YYYY-MM-DD hh:mm:ss"),
      layout: layout,
    };

    const _image = getState().image.preview;

    const storage = getStorage();
    const storageRef = ref(
      storage,
      `images/${user_info.user_id}_${new Date().getTime()}`
    );

    uploadString(storageRef, _image, "data_url").then((snapshot) => {
      getDownloadURL(storageRef).then((url) => {
        addDoc(collection(db, "post"), {
          ...user_info,
          ..._post,
          image_url: url,
        }).then((snapshot) => {
          console.log(snapshot.id);
          dispatch(
            postSet({ id: snapshot.id, user_info, ..._post, image_url: url })
          );
          history.replace("/");
        });
      });
    });
  };
};

export const postLoadFB = (start = null, size = 3) => {
  return async function (dispatch, getState, { history }) {
    dispatch(loading(true));

    let _paging = getState().post.paging;

    if (_paging.start && !_paging.next) {
      return;
    }

    let a = [];
    if (start) {
      a = [orderBy("insert_dt", "desc"), startAt(start), limit(size + 1)];
    } else {
      a = [orderBy("insert_dt", "desc"), limit(size + 1)];
    }
    let q = query(collection(db, "post"), ...a);

    await getDocs(q).then((docs) => {
      let list = [];

      let paging = {
        start: docs.docs[0],
        next:
          docs.docs.length === size + 1
            ? docs.docs[docs.docs.length - 1]
            : null,
        size: size,
      };
      docs.forEach((doc) => {
        let _post = doc.data();

        let post = Object.keys(_post).reduce(
          //키 값을 배열로 만듬
          (acc, cur) => {
            if (cur.indexOf("user_") !== -1) {
              return {
                ...acc,
                user_info: { ...acc.user_info, [cur]: _post[cur] },
              };
            }
            return { ...acc, [cur]: _post[cur] };
          },
          { id: doc.id, user_info: {} }
        );
        list.push(post);
      });

      list.pop();
      dispatch(postLoad(list, paging));
    });
  };
};

// reducer
export default handleActions(
  {
    [POST_LOAD]: (state, action) =>
      produce(state, (draft) => {
        draft.list.push(...action.payload.list);

        draft.list = draft.list.reduce((acc, cur) => {
          if (acc.findIndex((a) => a.id === cur.id) === -1) {
            return [...acc, cur];
          } else {
            acc[acc.findIndex((a) => a.id === cur.id)] = cur;
            return acc;
          }
        }, []);

        if (action.payload.paging) {
          draft.paging = action.payload.paging;
        }

        draft.is_loading = false;
      }),
    [POST_SET]: (state, action) =>
      produce(state, (draft) => {
        draft.list.unshift(action.payload.post);
      }),
    [POST_EDIT]: (state, action) =>
      produce(state, (draft) => {
        let idx = draft.list.findIndex((el) => {
          return el.id === action.payload.post_id;
        });
        console.log(idx, action.payload.content);
        draft.list[idx] = { ...draft.list[idx], ...action.payload.content };
      }),
    [LOADING]: (state, action) =>
      produce(state, (draft) => {
        draft.is_loading = action.payload.is_loading;
      }),
  },
  initialState
);

const actionCreators = {
  postLoadFB,
  postSetFB,
  editFB,
  getOnePostFB,
  postEdit,
};

export { actionCreators };
