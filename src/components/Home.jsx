import React, { useState } from "react";
import { motion } from "framer-motion";
import "./Home.css";

function Home() {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="Home" id="Home">
      <div className="content" data-aos="fade-right">
        <p className="Hi">Hi, I am</p>
        <h1>Ferdinand Immanuel</h1>
        <p className="pos">Junior Developer / Electrical Engineer</p>
        <a
          className="loc"
          href="https://maps.app.goo.gl/bTnenDfQrVPEGBdi9"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          target="_blank"
        >
          Bogor Regency, Indonesia
        </a>
      </div>
      <div className="Image-Mot" data-aos="fade-left">
        <motion.img
          key={hovered ? "hovered" : "default"}
          src={hovered ? "/assets/kbgr.jpg" : "/assets/mine_4.jpg"}
          className="img-background"
          alt=""
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        />
      </div>
    </div>
  );
}

export default Home;
