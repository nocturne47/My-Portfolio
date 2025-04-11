import React from "react";
import Header from "./components/Header";
import Home from "./components/Home";
import About from "./components/About";
import Projects from "./components/Projects";
import FaceRecog from "./components/FaceRecog";
import Contact from "./components/Contact";
import "./App.css";

function App() {
  return (
    <div className="app">
      <Header />
      <main>
        <Home />
        <About />
        <Projects />
        {/* <FaceRecog /> */}
        <Contact />
      </main>
    </div>
  );
}

export default App;
