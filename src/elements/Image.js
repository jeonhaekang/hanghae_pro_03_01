import React from "react";
import styled from "styled-components";

const Image = (props) => {
  const { shape, src } = props;
  const styles = {
    src: src,
  };
  if (shape === "rectangle") {
    return (
      <AspectOutter>
        <AspectInner {...styles}></AspectInner>
      </AspectOutter>
    );
  } else if (shape === "circle") {
    return <CircleImage {...styles}></CircleImage>;
  }
};

Image.defaultProps = {
  shape: "rectangle",
  src: "https://t1.daumcdn.net/liveboard/linkagelab/f0a375712a0946dabbbea47372a4c1d4.jpg",
};

const CircleImage = styled.div`
  background-image: url("${(props) => props.src}");
  background-size: cover;
  --size: 36px;
  width: var(--size);
  height: var(--size);
  border-radius: var(--size);
`;

const AspectOutter = styled.div`
  width: 100%;
  min-width: 250px;
`;

const AspectInner = styled.div`
  position: relative;
  padding-top: 75%;
  overflow: hidden;
  background-image: url("${(props) => props.src}");
  background-size: cover;
`;

export default Image;
