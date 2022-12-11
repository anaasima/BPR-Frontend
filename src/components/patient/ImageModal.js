import React from "react";
import "../../css/ImageModal.css";

const ImageModal = ({ imageSrc, handleCloseModal }) => {
  return (
    <div className="modalImage" onClick={() => handleCloseModal()}>
      <div className="modalImageContent">
        <img src={imageSrc} alt="Click to close" style={{ height: "80%" }} />
      </div>
    </div>
  );
};

export default ImageModal;
