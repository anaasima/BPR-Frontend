import React, { useState } from "react";
import ImageModal from "./ImageModal";

const Image = ({ imageSrc, title, intensity, handleIntensityChange }) => {
  const [isShowModal, setIsShowModal] = useState(false);

  return (
    <div className="imageDiv">
      <span className="imageLabel">Intensity slider</span>
      <input
        type="range"
        className="mb-2"
        min="1"
        max="5"
        style={{ width: "200px" }}
        value={intensity}
        onChange={(e) => handleIntensityChange(+e.target.value)}
      />
      <img
        src={imageSrc}
        alt={title + "CT Scan"}
        title="Click to expand"
        onClick={() => setIsShowModal(true)}
      />
      <span className="imageLabel">{title}</span>
      {isShowModal && (
        <ImageModal
          imageSrc={imageSrc}
          handleCloseModal={() => setIsShowModal(false)}
        />
      )}
    </div>
  );
};

export default Image;
