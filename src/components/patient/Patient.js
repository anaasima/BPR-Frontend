import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { tensor } from "@tensorflow/tfjs";
import { loadGraphModel } from "@tensorflow/tfjs-converter";
import "../../css/Patient.css";
import patientservice from "../../services/patientservice";
import loadingImage from "../../utils/loading.png";
import AppHeader from "../AppHeader";
import PatientHeader from "./PatientHeader";
import ImagesContainer from "./ImagesContainer";
import { reshapePixels } from "../../utils/imageUtil";

const MODEL_URL =
  "https://raw.githubusercontent.com/Toni751/BPR-Backend/master/model/model.json";
let originalPixels = [];
let filteredPixels = [];

const Patient = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [patient, setPatient] = useState(location.state);

  const [imageSrc, setImageSrc] = useState(loadingImage);
  const [filteredImageSrc, setFilteredImageSrc] = useState(loadingImage);

  const [originalIntensity, setOriginalIntesity] = useState(3);
  const [filteredIntensity, setFilteredIntesity] = useState(3);

  useEffect(() => {
    generatePixelImage();
  }, []);

  const generatePixelImage = async () => {
    patientservice
      .getPatientImageById(patient.accession)
      .then((resp) => {
        originalPixels = Object.values(resp.data);
        pixelArrayToImage(originalPixels, true, originalIntensity);
        filterPixelArray(Object.values(resp.data));
      })
      .catch((err) => console.log(err));
  };

  const pixelArrayToImage = (pixels, isOriginal, intensity) => {
    let canvas = document.createElement("canvas");
    let ctx = canvas.getContext("2d");

    const dim = 512;
    canvas.width = dim;
    canvas.height = dim;

    let imgData = ctx.getImageData(0, 0, dim, dim);
    let data = imgData.data;
    for (let i = 0; i < data.length; i += 4) {
      const value = isOriginal
        ? (pixels[i / 4] * intensity) / 30
        : pixels[i / 4] * intensity * 100;
      data[i] = Math.floor(Math.min(255, value));
      data[i + 1] = Math.floor(Math.min(255, value));
      data[i + 2] = Math.floor(Math.min(255, value));
      data[i + 3] = 255;
    }

    ctx.putImageData(imgData, 0, 0);
    isOriginal
      ? setImageSrc(canvas.toDataURL())
      : setFilteredImageSrc(canvas.toDataURL());
  };

  const filterPixelArray = async (pixels) => {
    const model = await loadGraphModel(MODEL_URL);
    const predict = model.predict(tensor(reshapePixels(pixels)));
    filteredPixels = await predict.data();
    pixelArrayToImage(filteredPixels, false, filteredIntensity);
  };

  const handleOriginalIntensityChange = (value) => {
    setOriginalIntesity(value);
    pixelArrayToImage(originalPixels, true, value);
  };

  const handleFilteredIntensityChange = (value) => {
    setFilteredIntesity(value);
    pixelArrayToImage(filteredPixels, false, value);
  };

  const getImages = () => {
    const originalImage = {};
    originalImage.src = imageSrc;
    originalImage.title = "Original";
    originalImage.intensity = originalIntensity;
    originalImage.handleIntensityChange = handleOriginalIntensityChange;

    const filteredImage = {};
    filteredImage.src = filteredImageSrc;
    filteredImage.title = "Filtered";
    filteredImage.intensity = filteredIntensity;
    filteredImage.handleIntensityChange = handleFilteredIntensityChange;

    const images = [];
    images.push(originalImage);
    images.push(filteredImage);
    return images;
  };

  return (
    <React.Fragment>
      <AppHeader
        onLogoClick={() => navigate("/patients")}
        isImageOnly={false}
      />
      <div className="patientContainer">
        <PatientHeader patient={patient} />
        <hr />
        <ImagesContainer images={getImages()} />
      </div>
    </React.Fragment>
  );
};

export default Patient;
