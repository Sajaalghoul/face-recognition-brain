import React from "react";
import "./FaceRecognition.css";

const FaceRecognition = ({ imageUrl, Box }) => {
  return (
    <div className="cenetr ma">
      <div className=" mt2">
      <div className="parent-container">
      <img
          id="inputImage"
          alt="img"
          src={imageUrl}
          width="500px"
          height="auto"
        />
        <div
          className="bounding-box"
          style={{
            top: Box.topRow,
            bottom: Box.bottomRow,
            left: Box.leftCol,
            right: Box.rightCol,
          }}
        ></div>
      </div>
    </div>
    </div>
  );
};

export default FaceRecognition;
