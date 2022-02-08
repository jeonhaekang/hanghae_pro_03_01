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
  preview:
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQkAAAC+CAMAAAARDgovAAAAJFBMVEXq6urQ0NDV1dXm5ubi4uLZ2dno6OjR0dHe3t7g4ODU1NTb29vXtTPwAAACjUlEQVR4nO3c6XKCMBRAYQiLiu//vrViFLIZmmSYe3u+vyDTnGGNla4DAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOC4+TqZFqbb2SM76N63I6rF1DBE31/PHl6+sWmIvh/OHmC2S+MS5uwB5hqef+51aGE9AZ09wlzPg2NqtPHld+Nzo43X9ixxb7RxI+lE0XSfoIRFCYsSlvgSt2lZzH0s37jwEu/HkKW4hewSy+b+sPTqKrrE/ua7MIXkEu6DadkBIrjE4D4/XYo2LriEP1dRtFMILuGFKLvVkFvCOzgel9L0x01yn1FVIj29YNKHj6oSyVOm+XImkVti9kukJt/Mt5Oq3BKBSc3EvZWx60RTCC5x9UrEx2E+K8VSCC7hXUbjF1GzXS2SQnIJ99uP6OfMfr1wCsklnOMjOgonRCSF6BLbvWKJTtB7IcIpZJfouvt6BVni3+4GQgRTSC/xuK8YxyHxhU0wRCiF/BJpkRCBFMpLREP4KXSXSITwUqgusaRCuCk0l0juEV4KxSW+htinUFNidh9EM0LsUmgpMbsLskJsUygpMbtLMkNsUugo8Zq/+izKDvFJoaLEeyLPLjsQYv8Z4SVmd1hHQryn/BSU2E3t/i49FEJRCWeOezoYQk8Jb7L/6P/xaikR+Nbjf5YoD6GkRIUQOkrUCKGiRJUQGkrMdX7tIb9EpRAKStT6/Y/8EpVCUIISlKAEJShBCUoUkz+jO1ZiBy+3RG2UsChhUcKihCWvBG9d6F4/bvnyE6e/WidFpbyJY72bujR5n9W66bMHmK3tS5xEvcapbYhGB14TQ8v3OEkK0TV83dtF0KHxMjd5n9XZowIAAAAAAAAAAAAAAAAAAAAAAAAAnOUH264aA95JfP8AAAAASUVORK5CYII=",
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
        console.log(action.payload.preview);
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
