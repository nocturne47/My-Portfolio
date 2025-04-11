import "./Projects.css";
import React, { useEffect, useState } from "react";
import Papa from "papaparse";
import {
  PythonIcon,
  ReactIcon,
  PHPIcon,
  SQLIcon,
  HTMLIcon,
  FlaskIcon,
  BootsIcon,
  CSSIcon,
  ESPIcon,
  ARDIcon,
} from "./icon";
import AOS from "aos";
import "aos/dist/aos.css";

function Projects() {
  // Use an object to hold the playing state per index
  const [playing, setPlaying] = useState({});
  const [data, setData] = useState([]); // State to hold CSV data
  const [hoveredIndex, setHoveredIndex] = useState(null);
  useEffect(() => {
    AOS.init({ duration: 800, offset: 120 });
  }, []);
  const Icons = {
    python: <PythonIcon />,
    react: <ReactIcon />,
    sql: <SQLIcon />,
    php: <PHPIcon />,
    html: <HTMLIcon />,
    flask: <FlaskIcon />,
    boots: <BootsIcon />,
    css: <CSSIcon />,
    esp: <ESPIcon />,
    arduino: <ARDIcon />,
  };

  // Toggle video for the specific index
  const handleToggle = (index) => {
    setPlaying((prevPlaying) => ({
      ...prevPlaying,
      [index]: !prevPlaying[index],
    }));
  };

  // Fetch CSV data
  const fetchCSV = async () => {
    try {
      const response = await fetch("/sample.csv"); // Update this path if necessary
      const csvText = await response.text();
      Papa.parse(csvText, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          setData(results.data);
        },
      });
    } catch (error) {
      console.error("Error fetching or parsing CSV file:", error);
    }
  };

  useEffect(() => {
    fetchCSV();
  }, []);

  return (
    <div className="Projects" id="Projects">
      <div id="proje-titel">
        <h1 data-aos="fade-down">Projects</h1>
        <p data-aos="fade-up" data-aos-delay="500">
          Here are some projects i've been working on
        </p>
      </div>

      <div className="proj-img" id="proj-img">
        <div className="proj-img-all">
          {data.length > 0 ? (
            data.map((row, index) => (
              <div className="Coba">
                <div
                  className="gbr-tit"
                  key={index}
                  onMouseEnter={() => setHoveredIndex(index)}
                  // onMouseLeave={() => setHoveredIndex(null)}
                >
                  <div
                    className="Media-Player fixed-media"
                    data-aos="fade-left"
                  >
                    {playing[index] ? (
                      <video
                        src={`../assets/proj/${row.video}`} // Replace with the actual video URL if different per project
                        controls
                        autoPlay
                        className="media-element cursor-pointer"
                        id="video"
                        onClick={() => handleToggle(index)}
                        onEnded={() => handleToggle(index)} // When the video ends, toggle back to the image
                      />
                    ) : (
                      <img
                        src={`../assets/proj/${row.gambar}`}
                        alt={row.judul}
                        className="media-element cursor-pointer"
                        onClick={() => handleToggle(index)}
                      />
                    )}
                  </div>
                  <div className="below" data-aos="fade-right">
                    <p className="row-subjudul">{row.subjudul}</p>
                    <h2 className="row-judul">{row.judul}</h2>
                    <p className="row-text">
                      {row.text}{" "}
                      {row.link && (
                        <a href={`${row.link}`} target="_blank">
                          Click here to see further.
                        </a>
                      )}
                    </p>
                    <div className="proj-tech">
                      {row.tech.split(",").map((tech, idx) => (
                        <span key={idx} className="icon">
                          {Icons[tech.trim()] || <span>{tech.trim()}</span>}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>Loading projects...</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Projects;
