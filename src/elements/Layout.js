import React from "react";
import styled from "styled-components";
import { Grid, Image, Text } from "../elements/Index";

const Layout = (props) => {
  const { children, layout, content, preview } = props;
  if (layout === "bottom") {
    return (
      <BottomLayout>
        <Text>{content}</Text>
        <Image src={preview} />
      </BottomLayout>
    );
  } else if (layout === "left") {
    return (
      <LeftLayout>
        <Grid>
          <Text>{content}</Text>
        </Grid>
        <Grid>
          <Image src={preview} />
        </Grid>
      </LeftLayout>
    );
  } else if (layout === "right") {
    return (
      <RightLayout>
        <Grid>
          <Image src={preview} />
        </Grid>
        <Grid>
          <Text>{content}</Text>
        </Grid>
      </RightLayout>
    );
  }
};

const BottomLayout = styled.div``;
const LeftLayout = styled.div`
  display: flex;
  gap: 20px;
`;
const RightLayout = styled.div`
  display: flex;
  gap: 20px;
`;

export default Layout;
