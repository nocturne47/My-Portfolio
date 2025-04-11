import "./About.css";
import React from "react";
import { useEffect, useState } from "react";
import Documents from "./Documents";
// import ToggleContent from "./Documents";

import gbr1 from "../assets/abt/gbr1.JPG";
import gbr2 from "../assets/abt/gbr2.jpg";
import gbr3 from "../assets/abt/gbr3.jpg";
import gbr4 from "../assets/abt/gbr4.jpg";
import gbr5 from "../assets/abt/gbr5.jpg";
import AOS from "aos";
import "aos/dist/aos.css";
const images = [gbr1, gbr2, gbr3, gbr4, gbr5];

function About() {
  useEffect(() => {
    AOS.init({ duration: 800, offset: 120 });
  }, []);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [currentImage, setCurrentImage] = useState(images[0]);

  const [isClicked, setIsClicked] = useState(false);
  const toggleClick = () => {
    setIsClicked((prev) => !prev);
  };

  // Function to go to the next image
  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  // Function to go to the previous image
  const prevImage = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  // Automatically change the image every 3 seconds
  useEffect(() => {
    if (!hovered) {
      const interval = setInterval(nextImage, 3000);
      return () => clearInterval(interval);
    }
  }, [hovered, nextImage]);

  useEffect(() => {
    if (!hovered) {
      setCurrentImage(images[currentIndex]);
    }
  }, [currentIndex, hovered]);

  const handleMouseEnter = (index) => {
    setHovered(true);
    setCurrentIndex(index);
  };
  const handleMouseLeave = () => {
    setHovered(false);
  };
  return (
    <div className="About" id="About">
      <h1 data-aos="fade-right">I am...</h1>
      <div className="abcontent">
        <div className="imagesab" data-aos="zoom-in" data-aos-delay="200">
          <img
            src={images[currentIndex]}
            className="about-img"
            alt="SlideShow"
          />
        </div>
        <div className="contentab-par" data-aos="fade-up" data-aos-delay="100">
          <p>
            A recent graduate from{" "}
            <span
              className="usu"
              onMouseEnter={() => handleMouseEnter(0)}
              onMouseLeave={handleMouseLeave}
            >
              <a href="">Universitas Sumatera Utara</a>{" "}
            </span>{" "}
            who eager to know and practice more about Technology Advancement
            such as Artificial Intelligence, automation and robotic system
            design, and also digitalization like app and website development.
          </p>
          <p>
            So i decided to take opportunities to have experiences in tech's
            kind of works and projects. During my time as an{" "}
            <span
              className="dte"
              onMouseEnter={() => handleMouseEnter(1)}
              onMouseLeave={handleMouseLeave}
            >
              <a href="">Electrical Engineering</a>
            </span>{" "}
            student, i joined{" "}
            <span
              className="ukm"
              onMouseEnter={() => handleMouseEnter(2)}
              onMouseLeave={handleMouseLeave}
            >
              <a href="">UKM Robotic SIKONEK USU</a>
            </span>{" "}
            and learn things there. I also took a Practical Work at{" "}
            <span
              className="bmkg"
              onMouseEnter={() => handleMouseEnter(3)}
              onMouseLeave={handleMouseLeave}
            >
              <a href="">
                Balai Besar Meteorologi Klimatologi dan Geofisika Region 1
                Medan.
              </a>
            </span>{" "}
            I also had projects done those i will show in the{" "}
            <a href="#Projects">Projects</a> section. Including my final thesis
            was about Designing Cashless Payment System using Face Recognition.
            And know, after my graduation i work at{" "}
            <span
              className="smi"
              onMouseEnter={() => handleMouseEnter(4)}
              onMouseLeave={handleMouseLeave}
            >
              <a href="">Swap Energi Indonesia</a>
            </span>{" "}
            as a Product Technician for Battery Swap Station project for all
            area in Indonesia. For other documents,{" "}
            <span
              className="ShowOther"
              onClick={toggleClick}
              style={{ cursor: "pointer", color: "blue" }}
            >
              {isClicked ? "Hide" : "Click here"}
            </span>
            .
          </p>
        </div>
      </div>
      {isClicked && (
        <div className="docab">
          <Documents isClicked={isClicked} />
        </div>
      )}
    </div>
  );
}
export default About;
