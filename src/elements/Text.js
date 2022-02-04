import React from "react";
import styled from "styled-components";

const Text = (props) => {
  const { size, color, bold, margin,children } = props;

  const styles = {
    size: size,
    color: color,
    bold: bold,
    margin: margin,
  };

  return <TextEl {...styles}>{children}</TextEl>;
};

Text.defaultProps = {
  size: "14px",
  color: "black",
  bold: "400",
  margin: "14px 0"
};

const TextEl = styled.p`
  font-size: ${(props) => props.size};
  color: ${(props) => props.color};
  font-weight: ${(props) => props.bold};
  margin: ${(props) => props.margin};
`;

export default Text;
