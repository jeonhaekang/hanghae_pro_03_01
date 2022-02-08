import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as imageActions } from "../redux/modules/image";

const Upload = (props) => {
  const { _onKeyUp } = props;
  const dispatch = useDispatch();
  const fileInput = React.useRef(null);
  const is_uploading = useSelector((state) => state.image.uploading);

  const selectFile = () => {
    const reader = new FileReader();
    const file = fileInput.current.files[0];

    reader.readAsDataURL(file);

    reader.onloadend = () => {
      dispatch(imageActions.setPreivew(reader.result));
    };
  };

  return (
    <React.Fragment>
      <input
        disabled={is_uploading}
        onChange={selectFile}
        
        ref={fileInput}
        type="file"
        onKeyUp={_onKeyUp}
      />
    </React.Fragment>
  );
};

Upload.defaultProps = {
  _onChange: () => {},
  _onKeyUp: () => {},
};

export default Upload;
