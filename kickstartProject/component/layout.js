import React from "react";
import { Container } from "semantic-ui-react";
import Header from "./header";
const layout = (props) => {
  return (
    <Container>
      <Header />
      {props.children}
    </Container>
  );
};

export default layout;
