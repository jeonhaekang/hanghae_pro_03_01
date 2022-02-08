import { handleActions, createAction } from "redux-actions";
import produce from "immer";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const UPLOADING = "UPLOADING";
const UPLOAD_IMAGE = "UPLOAD_IMAGE";
const SET_PREVIEW = "SET_PREVIEW";

const uploading = createAction(UPLOADING, (uploading) => ({ uploading }));
const uploadImage = createAction(UPLOAD_IMAGE, (image_url) => ({ image_url }));
const setPreivew = createAction(SET_PREVIEW, (preview) => ({ preview }));

const initialState = {
  image_url: "",
  uploading: false,
  preview: null,
};

const uploadImageFB = (image) => {
  return async function (dispatch, getState, { history }) {
    dispatch(uploading(true));
    const storage = getStorage();

    const storageRef = ref(storage, `images/${image.name}`);

    uploadBytes(storageRef, image).then((snapshot) => {
      getDownloadURL(ref(storage, snapshot.ref.fullPath)).then((url) => {
        console.log(url);
        dispatch(uploadImage(url));
      });
    });
  };
};

export default handleActions(
  {
    [UPLOAD_IMAGE]: (state, action) =>
      produce(state, (draft) => {
        draft.image_url = action.payload.image_url;
        draft.uploading = false;
      }),
    [UPLOADING]: (state, action) =>
      produce(state, (draft) => {
        draft.uploading = action.payload.uploading;
      }),
    [SET_PREVIEW]: (state, action) =>
      produce(state, (draft) => {
        draft.preview = action.payload.preview;
      }),
  },
  initialState
);

const actionCreators = {
  uploadImageFB,
  setPreivew,
};

export { actionCreators };
