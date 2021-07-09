import React, { Component, useState } from "react";
import ReactDOM from "react-dom";
import Stars from "./Stars.jsx";
import Description from "./Description.jsx";
import Images from "./images.jsx";
const App = (props) => {
  const [id, setId] = useState(11001);

  return (
    <div className="flex gap-6 bg-gray-200">
      <Images id={id} />
      <div className="">
        <Stars id={id} />
        {/* <Description id={id} /> */}
      </div>

    </div>
  );
};
ReactDOM.render(<App />, document.getElementById("overview"));
