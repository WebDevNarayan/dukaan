import React from "react";
import { FaAddressCard, FaPhoneAlt } from "react-icons/fa";
import { MdContactPhone, MdOutlineMail } from "react-icons/md";

const Contact = () => {
  return (
    <div
      style={{
        color: "white",
        lineHeight: "1.5",
        padding: "0px 10px",
      }}
    >
      <p
        style={{
          fontSize: "20px",
          marginBottom: "10px",
          fontWeight: "600",
        }}
      >
        <MdContactPhone /> Contact
      </p>
      <p>
        <FaPhoneAlt /> <label htmlFor="सम्पर्क नं. :">Phone No. :</label>{" "}
        +977-9829286282,
        <br /> 9866050382
      </p>
      <p>
        <MdOutlineMail /> <label htmlFor="Email :">Email :</label>{" "}
        narayandura5@gmail.com
      </p>
      <p>
        <FaAddressCard /> <label htmlFor="Address :">Address :</label>{" "}
        Budibazar-26, Leknath <br />
        Nepal
      </p>
    </div>
  );
};

export default Contact;
