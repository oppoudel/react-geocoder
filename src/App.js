import React, { Component } from "react";
import Geocoder from "./components/Geocoder/Geocoder";

class App extends Component {
  render() {
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
}

export default App;
