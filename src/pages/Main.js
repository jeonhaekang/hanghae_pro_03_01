import React from "react";
import Card from "../components/Card";
import { Grid } from "../elements/Index";

const Main = (props) => {
  return (
    <Grid>
      <Card />
      <Card />
      <Card />
    </Grid>
  );
};

Main.defaultProps = {};

export default Main;
