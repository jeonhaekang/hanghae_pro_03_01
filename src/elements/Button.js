import React from "react";
import styled, { keyframes } from "styled-components";

const Button = (props) => {
  const { shape, width, margin, padding, bg, children, _onClick, disabled } =
    props;

  const styles = {
    width: width,
    padding: padding,
    margin: margin,
    bg: bg,
  };

  if (shape === "heart") {
    return (
      <HeartButton onClick={_onClick} {...styles}>
        {children}
      </HeartButton>
    );
  } else if (shape === "edit") {
    return (
      <EditButton onClick={_onClick} {...styles}>
        {children}
      </EditButton>
    );
  }

  return (
    <ButtonEl disabled={disabled} onClick={_onClick} {...styles}>
      {children}
    </ButtonEl>
  );
};

Button.defaultProps = {
  width: "auto",
  padding: "0px",
  margin: "0px",
  bg: false,
  shape: "rectangle",
  _onClick: () => {},
  disabled: false,
};

const HeartButton = styled.button`
  width: auto;
  font-size: 20px;
  background: none;
  border: none;
  color: red;
`;

const ButtonEl = styled.button`
  width: ${(props) => props.width};
  padding: ${(props) => props.padding};
  margin: ${(props) => props.margin};

  ${(props) => (props.bg ? `background-color:${props.bg};` : "")}
`;
const EditAnimation = keyframes`
  100%{
    transform: rotate(90deg);
  }
`;

const EditButton = styled.button`
  width: 60px;
  height: 60px;
  border-radius: 40px;
  border: 0;
  background-color: #fc965d;
  font-size: 50px;
  font-weight: bold;
  color: white;
  position: fixed;
  bottom: 20px;
  right: 20px;
  :hover {
    animation: ${EditAnimation} 0.2s;
  }
`;

export default Button;
