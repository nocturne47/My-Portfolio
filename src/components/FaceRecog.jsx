import React, { useRef, useEffect, useState } from "react";
import Webcam from "react-webcam";
import "./FaceRecog.css";

function FaceRecog() {
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const webcamRef = useRef(null);
  const [faces, setFaces] = useState([]);
  const ws = useRef(null);

  const handleOpenCamera = () => setIsCameraOpen(true);
  const handleCloseCamera = () => setIsCameraOpen(false);

  useEffect(() => {
    ws.current = new WebSocket("ws://127.0.0.1:8000/ws");

    ws.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setFaces(data.faces);
    };

    return () => ws.current.close();
  }, []);

  const sendFrame = async () => {
    if (webcamRef.current && ws.current.readyState === WebSocket.OPEN) {
      const imageSrc = webcamRef.current.getScreenshot();
      if (imageSrc) {
        const base64Image = imageSrc.split(",")[1];
        ws.current.send(base64Image);
      }
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      sendFrame();
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div id="FaceRecog">
      <h2>Face Recognition</h2>
      <div id="cam">
        {!isCameraOpen ? (
          <button onClick={handleOpenCamera}>Open Camera</button>
        ) : (
          <>
            <Webcam ref={webcamRef} screenshotFormat="image/jpeg" />
            <button onClick={handleCloseCamera}>Close Camera</button>
          </>
        )}
        {faces.map((face, index) => (
          <div key={index} style={{ position: "relative" }}>
            <div
              style={{
                position: "absolute",
                border: "2px solid red",
                top: face.y,
                left: face.x,
                width: face.width,
                height: face.height,
              }}
            />
            <p
              style={{
                position: "absolute",
                top: face.y - 20,
                left: face.x,
                backgroundColor: "black",
                color: "white",
                padding: "5px",
                borderRadius: "5px",
                fontSize: "14px",
              }}
            >
              {face.name} ({face.similarity}%)
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FaceRecog;
