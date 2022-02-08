import React from "react";
import styled from "styled-components";
import { Grid, Text } from "../elements/Index";

const Input = (props) => {
  const {
    _onKeyUp,
    testArea,
    label,
    placeholder,
    _onChange,
    type,
    value,
    onSubmit,
  } = props;
  if (testArea) {
    return (
      <TextAreaEl
        rows={10}
        onKeyUp={_onKeyUp}
        onChange={_onChange}
        value={value}
      ></TextAreaEl>
    );
  }
  return (
    <Grid>
      {label ? <Text margin="5px 0">{label}</Text> : ""}
      <InputEl
        value={value}
        onKeyUp={_onKeyUp}
        type={type}
        onChange={_onChange}
        placeholder={placeholder}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            onSubmit(e);
          }
        }}
      ></InputEl>
    </Grid>
  );
};

Input.defaultProps = {
  label: "",
  placeholder: "",
  _onChange: () => {},
  type: "test",
  value: "",
  onSubmit: () => {},
  _onKeyUp: () => {},
};

const InputEl = styled.input`
  width: 100%;
  box-sizing: border-box;
  padding: 10px;
`;

const TextAreaEl = styled.textarea`
  width: 100%;
  box-sizing: border-box;
  resize: none;
`;

export default Input;
