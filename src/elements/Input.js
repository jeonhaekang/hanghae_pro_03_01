import React from "react";
import styled from "styled-components";
import { Grid, Text } from "../elements/Index";

const Input = (props) => {
  const { testArea, label, placeholder, _onChange, type } = props;
  if (testArea) {
    return <TextAreaEl rows={10}></TextAreaEl>;
  }
  return (
    <Grid>
      <Text margin="5px 0">{label}</Text>
      <InputEl
        type={type}
        onChange={_onChange}
        placeholder={placeholder}
      ></InputEl>
    </Grid>
  );
};

Input.defaultProps = {
  label: "",
  placeholder: "",
  _onChange: () => {},
  type: "test",
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
