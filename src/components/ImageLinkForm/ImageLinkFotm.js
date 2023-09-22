import React from "react";
import "./ImageLinkForm.css";


const ImageLinkForm = ({OnInputChange,onImageSubmit}) => {
  return (
    <div>
      <p className="f3">
        {"The Magic Brain will detect faces in your pictures. Git it a try"}
      </p>
      <div className="center">
        <div className="form pa4 br3 shadow-5">
          <input className="f4 pa2 w-70" type="text" onChange={OnInputChange}/>
          <button className="bn w-30 f4 link ph3 pv2 dib white grow bg-light-purple" onClick={onImageSubmit} >
            Detect
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageLinkForm;
