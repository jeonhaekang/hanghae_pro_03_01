import React from "react";
import styled from "styled-components";

const Grid = (props) => {
  const { is_flex, margin, padding, children, bg, border, width } =
    props;

  const border_data = border ? border.split(" ") : false;

  const styles = {
    is_flex: is_flex,
    margin: margin,
    padding: padding,
    bg: bg,
    bolder: border,
    border_data: border_data,
    width: width,
  };

  return <GridBox {...styles}>{children}</GridBox>;
};

Grid.defaultProps = {
  is_flex: false,
  margin: 0,
  padding: 0,
  bg: false,
  border: false,
  width: "100%",
};

const GridBox = styled.div`
  width: ${(props) => props.width};
  height: 100%;
  margin: ${(props) => props.margin};
  padding: ${(props) => props.padding};
  box-sizing: border-box;

  ${(props) =>
    props.border !== false
      ? `border${props.border_data[3]}: ${props.border_data[0]} ${props.border_data[1]} ${props.border_data[2]};`
      : ""}

  ${(props) => (props.bg ? `background-color:${props.bg};` : "")}
    
  ${(props) =>
    props.is_flex
      ? "display:flex; justify-content: space-between; align-items: center;"
      : ""}
`;

export default Grid;
