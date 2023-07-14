import { createStyles } from "@mantine/core";
import React from "react";
const useStyles = createStyles(() => ({
  container: { width: "100%", padding: "0 1rem" },
  heading: {},
  para: { width: "50vw" },
  text: {
    color: "red",
  },
}));

const About = () => {
  const { classes } = useStyles();
  return (
    <div className={classes.container}>
      <h2 className={classes.heading}>About Us</h2>
      <p className={classes.para}>
        Welcome to Duk<span className={classes.text}>@</span>an, your
        one-stop-shop for Clothing.
      </p>
      <p className={classes.para}>
        At Duk<span className={classes.text}>@</span>an, we're passionate about
        quality, affordability and sustainability. We believe that everyone
        should have access to our products, and we're dedicated to providing the
        highest quality products at affordable prices.
      </p>

      <p>Thank you for choosing Duk@an. We look forward to serving you!</p>
    </div>
  );
};

export default About;
