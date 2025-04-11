import React from "react";
import { useState } from "react";
import "./Contact.css";
import { GithubIcon, InstaIcon, ReactIcon } from "./icon";
import AOS from "aos";
import "aos/dist/aos.css";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const result = await response.json();

      if (response.ok) {
        alert("✅" + result.message);
        setFormData({ name: "", email: "", message: "" });
      } else {
        alert("❌ Failed to send message.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("❌ Server error.");
    }
  };

  return (
    <div className="Contact" id="Contact">
      <div className="cont" data-aos="fade-up">
        <h1>Get in Touch</h1>
        <p>"Communication is the key of successful relationship"</p>
        <div className="Fill-Box">
          <form action="" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="Your name"
            />
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              id=""
              placeholder="your-email@mail.com"
            />
            <textarea
              name="message"
              required
              value={formData.message}
              onChange={handleChange}
              id=""
              placeholder="Your message..."
            ></textarea>
            <button className="submit-btn">Submit Message</button>
          </form>
        </div>
      </div>
      <div className="tact" data-aos="fade-down">
        <div className="tact-half">
          <div className="item-icons">
            <a href="https://www.linkedin.com/in/ferimmanuel7/" target="_blank">
              <img
                width="20px"
                height="20px"
                src="..\assets\proj\linkedin.png"
                className="Cont-Icons"
              />
            </a>
            <a href="https://github.com/nocturne47" target="_blank">
              <GithubIcon className="Cont-Icons" />
            </a>
            <a href="https://www.instagram.com/ferimmanuel7/" target="_blank">
              <InstaIcon className="Cont-Icons" />
            </a>
          </div>
          <p>
            Feel free to send me message to{" "}
            <a href="mailto:immanuelnaibaho1@gmail.com">
              immanuelnaibaho1@gmail.com
            </a>
          </p>
        </div>
        <div className="pic-cont"></div>
      </div>
    </div>
  );
}

export default Contact;
