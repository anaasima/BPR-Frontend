import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { tensor } from "@tensorflow/tfjs";
import { loadGraphModel } from "@tensorflow/tfjs-converter";
import "../../css/Patient.css";
import AppHeader from "../AppHeader";
import PatientHeader from "./PatientHeader";
import { reshapePixels } from "../../utils/imageUtil";
import * as cornerstone from "cornerstone-core";
import * as cornerstoneMath from "cornerstone-math";
import * as cornerstoneTools from "cornerstone-tools";
import * as cornerstoneWADOImageLoader from "cornerstone-wado-image-loader";
import * as dicomParser from "dicom-parser";
import Hammer from "hammerjs";
import patientservice from "../../services/patientservice";

cornerstoneWADOImageLoader.external.cornerstone = cornerstone;
cornerstoneWADOImageLoader.external.dicomParser = dicomParser;

cornerstoneTools.external.cornerstone = cornerstone;
cornerstoneTools.external.cornerstoneMath = cornerstoneMath;
cornerstoneTools.external.Hammer = Hammer;
cornerstoneTools.init();

const MODEL_URL =
  "https://raw.githubusercontent.com/Toni751/BPR-Backend/master/model/model.json";

const IMAGE_BASE_URL =
  "wadouri:https://raw.githubusercontent.com/Toni751/RIS-PACS-Mock/master/images/";

const Patient = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [patient, setPatient] = useState(location.state);

  useEffect(() => {
    if (localStorage.getItem("app-token") === null) {
      navigate("/");
      return;
    }

    getWadoImage();
  }, []);

  const getWadoImage = async () => {
    const element = document.getElementById("dicomImage");
    cornerstone.enable(element);

    const imageUrl = IMAGE_BASE_URL + patient.accession + ".dcm";
    const image = await cornerstone.loadImage(imageUrl);
    const pixels = image.getPixelData();

    const viewport = cornerstone.getDefaultViewportForImage(element, image);
    cornerstone.displayImage(element, image, viewport);

    await filterPixelArray(pixels, image);
    cornerstoneTools.addTool(cornerstoneTools.WwwcTool);
    cornerstoneTools.addTool(cornerstoneTools.ZoomMouseWheelTool);

    cornerstoneTools.setToolActive("Wwwc", { mouseButtonMask: 1 });
    cornerstoneTools.setToolActive("ZoomMouseWheel", { mouseButtonMask: 1 });
  };

  const filterPixelArray = async (pixels, image) => {
    const model = await loadGraphModel(MODEL_URL);
    const predict = model.predict(tensor(reshapePixels(pixels)));
    const filteredPixels = await predict.data();

    const intFilteredPixels = mapFilteredPixels(filteredPixels);
    image.imageFrame.pixelData = intFilteredPixels;

    const element = document.getElementById("dicomImageFiltered");
    cornerstone.enable(element);

    const viewport = cornerstone.getDefaultViewportForImage(element, image);
    cornerstone.displayImage(element, image, viewport);

    // This request could be broken up into multiple batches, as the dicom file is very large
    // patientservice
    //   .savePatientFilteredImage(image.data.byteArray)
    //   .then((response) => console.log(response.data))
    //   .catch((err) => console.log(err));
  };

  const mapFilteredPixels = (pixels) => {
    const pixels_16 = new Uint16Array(512 * 512);
    for (let i = 0; i < 512 * 512; i++) {
      pixels_16[i] = Math.floor(pixels[i] * 2938);
    }
    return pixels_16;
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
        <div className="imagesContainer">
          <div className="dicomImageContainer">
            <div id="dicomImage" className="dicomImage"></div>
            <span className="dicomImageLabel">Original</span>
          </div>
          <div className="dicomImageContainer">
            <div id="dicomImageFiltered" className="dicomImage"></div>
            <span className="dicomImageLabel">Filtered</span>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Patient;
