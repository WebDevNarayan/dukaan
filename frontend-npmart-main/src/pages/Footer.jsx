import { Container } from "@mantine/core";
import React from "react";
import { Contact, DukaanApp, Location } from "../components/footer";

const Footer = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        background: "black",
        height: "100%",
        marginTop: "2rem",
      }}
    >
      <Container
        style={{
          padding: "0px 10px",
          borderRadius: "5px",
          width: "100%",
        }}
      >
        <Contact />
      </Container>
      <Container
        style={{
          padding: "0px 10px",
          borderRadius: "5px",
          width: "100%",
        }}
      >
        <Location />
      </Container>
      <Container
        style={{
          padding: "0px 10px",
          borderRadius: "5px",
          width: "100%",
        }}
      >
        <DukaanApp />
      </Container>
    </div>
  );
};

export default Footer;
