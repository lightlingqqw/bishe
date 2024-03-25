import React from "react";
import { Routes, Route } from "react-router-dom";
import A from "./pages/A/index.tsx";
import B from "./pages/B/index.tsx";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/a" element={<A/>} />
        <Route path="/b" element={<B/>} />
      </Routes>
    </div>
  );
}

export default App;
