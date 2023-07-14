import { AspectRatio } from "@mantine/core";
import React from "react";
import { FaLocationArrow } from "react-icons/fa";

const Location = () => {
  return (
    <div style={{ color: "white", height: "fit-content" }}>
      <p style={{ lineHeight: "1.5", fontSize: "20px", fontWeight: "600" }}>
        <FaLocationArrow /> Duk@an Location
      </p>
      <AspectRatio ratio={12 / 9}>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3515.7516155194758!2d83.9978087743615!3d28.214858102927128!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39959434ad2a5bf9%3A0xf4e7f9c749f63113!2sInformatics%20College%20Pokhara!5e0!3m2!1sen!2snp!4v1683428073011!5m2!1sen!2snp"
          width="250px"
          height="200px"
        ></iframe>
      </AspectRatio>
    </div>
  );
};

export default Location;
