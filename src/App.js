import React from "react";
import Geocoder from "./components/Geocoder/Geocoder";

function App() {
  return (
    <div
      style={{
        marginTop: "50px",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        textAlign: "center"
      }}
    >
      <h2>Geocoder Component</h2>
      <Geocoder />
    </div>
  );
}

export default App;
