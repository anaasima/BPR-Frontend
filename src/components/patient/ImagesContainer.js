import React from "react";
import Image from "./Image";

const ImagesContainer = ({ images }) => {
  return (
    <div className="imagesContainer">
      {images.map((image, index) => {
        return (
          <Image
            key={index}
            imageSrc={image.src}
            title={image.title}
            intensity={image.intensity}
            handleIntensityChange={image.handleIntensityChange}
          />
        );
      })}
    </div>
  );
};

export default ImagesContainer;
