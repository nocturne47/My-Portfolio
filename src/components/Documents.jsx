import React, { useState, useEffect } from "react";
import "./Documents.css";
import { motion } from "framer-motion";

const images3 = "../src/assets/abt/doc/Trans_2.jpg";
const images1 = [
  "public/assets/abt/doc/Ijazah.jpg",
  "public/assets/abt/doc/Trans_1.jpg",
  "public/assets/abt/doc/Trans_2.jpg",
];
const images2 = [
  "public/assets/abt/doc/ai4s.jpg",
  "public/assets/abt/doc/cisco.jpg",
  "public/assets/abt/doc/sql.jpg",
  "public/assets/abt/doc/visualisasi.jpg",
  "public/assets/abt/doc/bmkg.jpg",
  "public/assets/abt/doc/sikonek.jpg",
];
const teks1 = ["Ijazah", "Transkrip_1", "Transkrip_2"];
const teks2 = [
  "AI for Startups",
  "Cisco: Python",
  "SQL(Basic)",
  "Visualisasi Data",
  "KP: BBMKG",
  "Robotik SIKONEK",
];

const Documents = ({ isClicked }) => {
  const [selectedIndex1, setSelectedIndex1] = useState(0);
  const [selectedIndex2, setSelectedIndex2] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const interval1 = setInterval(() => {
      setSelectedIndex1((prevIndex1) => (prevIndex1 + 1) % images1.length);
    }, 3000);
    return clearInterval(interval1);
  }, []);
  useEffect(() => {
    const interval2 = setInterval(() => {
      setSelectedIndex2((prevIndex2) => (prevIndex2 + 1) % images2.length);
    }, 3000);
    return clearInterval(interval2);
  }, []);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isPreviewOpen1, setIsPreviewOpen1] = useState(false);

  const handleImageClick = () => {
    setIsPreviewOpen(true);
  };

  // Close the preview (lightbox)
  const handleClosePreview = () => {
    setIsPreviewOpen(false);
  };

  const handleImageClick1 = () => {
    setIsPreviewOpen1(true);
  };

  // Close the preview (lightbox)
  const handleClosePreview1 = () => {
    setIsPreviewOpen1(false);
  };

  const handleDotClick1 = (index1) => {
    setSelectedIndex1(index1);
  };
  const handleDotClick2 = (index2) => {
    setSelectedIndex2(index2);
  };
  return (
    <div className={`docs ${isClicked ? "show" : "hide"}`}>
      <h2>Documents</h2>
      <div className="docu">
        <div className="ijtra">
          <div className="image-carousel">
            {/* Display the Selected Image */}
            <h4>{teks1[selectedIndex1]}</h4>
            <img
              src={images1[selectedIndex1]}
              alt={`Slide ${selectedIndex1 + 1}`}
              className="image"
              onClick={handleImageClick}
            />

            {/* Dots for Selecting Image */}
            <div className="dots">
              {images1.map((_, index1) => (
                <button
                  key={index1}
                  className={`dot ${index1 === selectedIndex1 ? "active" : ""}`}
                  onClick={() => handleDotClick1(index1)}
                />
              ))}
            </div>

            {isPreviewOpen && (
              <div className="lightbox" onClick={handleClosePreview}>
                <img
                  src={images1[selectedIndex1]}
                  alt="Preview"
                  className="lightbox-image"
                />
              </div>
            )}
          </div>
        </div>
        <div className="sert">
          <div className="image-carousel">
            {/* Display the Selected Image */}
            <h4>{teks2[selectedIndex2]}</h4>
            <img
              src={images2[selectedIndex2]}
              alt={`Slide ${selectedIndex2 + 1}`}
              className="image"
              onClick={handleImageClick1}
            />

            {/* Dots for Selecting Image */}
            <div className="dots">
              {images2.map((_, index2) => (
                <button
                  key={index2}
                  className={`dot ${index2 === selectedIndex2 ? "active" : ""}`}
                  onClick={() => handleDotClick2(index2)}
                />
              ))}
            </div>

            {isPreviewOpen1 && (
              <div className="lightbox" onClick={handleClosePreview1}>
                <img
                  src={images2[selectedIndex2]}
                  alt="Preview"
                  className="lightbox-image"
                />
              </div>
            )}
          </div>
        </div>
      </div>
      <a href="CV.pdf" download="CV.pdf" className="cv">
        Download My CV <span onMouseEnter={() => setIsHovered(true)}>📄</span>
      </a>
      {isHovered && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="lightbox"
        >
          <img
            src="../src/assets/abt/doc/cv.jpg"
            alt="CV Preview"
            className="lightbox-image"
            onMouseLeave={() => setIsHovered(false)}
          />
        </motion.div>
      )}
    </div>
  );
};

export default Documents;
// export default Documents;
