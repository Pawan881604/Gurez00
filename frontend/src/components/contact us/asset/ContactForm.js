import React, { useState } from "react";
import "./Contact.css";

const ContactForm = ({inputValue,handleinputValue,handlesubmitForm}) => {


  return (
    <>
      <form onSubmit={handlesubmitForm}>
        <div className="contact-form-main">
          <label>
            Your Name
            <br />
            <input
              type="text"
              value={inputValue.name}
              name="name"
              onChange={handleinputValue}
              required
            />
          </label>
          <label>
            Your Email <br />
            <input
              type="email"
              value={inputValue.email}
              name="email"
              onChange={handleinputValue}
              required
            />
          </label>
          <label>
            Your Subject <br />
            <input
              type="text"
              value={inputValue.subject}
              name="subject"
              onChange={handleinputValue}
              required
            />
          </label>
          <label>
            Message <br />
            <textarea
              rows="4"
              cols="50"
              value={inputValue.message}
              name="message"
              onChange={handleinputValue}
            />
          </label>
          <button type="Submit">Submit</button>
        </div>
      </form>
    </>
  );
};

export default ContactForm;