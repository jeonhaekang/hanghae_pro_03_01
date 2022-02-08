import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as imageActions } from "../redux/modules/image";

const Upload = (props) => {
  const dispatch = useDispatch();
  const fileInput = React.useRef(null);
  const is_uploading = useSelector((state) => state.image.uploading);

  const selectFile = () => {
    const reader = new FileReader();
    const file = fileInput.current.files[0];

    reader.readAsDataURL(file);

    reader.onloadend = () => {
      console.log(reader.result);
      dispatch(imageActions.setPreivew(reader.result));
    };
  };

  const uploadFB = () => {
    const image = fileInput.current.files[0];

    dispatch(imageActions.uploadImageFB(image));
  };

  return (
    <React.Fragment>
      <input
        disabled={is_uploading}
        onChange={selectFile}
        ref={fileInput}
        type="file"
      />
      {/* <button onClick={uploadFB}>파일 업로드</button> */}
    </React.Fragment>
  );
};

export default Upload;
