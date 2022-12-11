import React, { useState } from "react";
import patientservice from "../../services/patientservice";
import StudiesModal from "./StudiesModal";

const SearchBar = () => {
  const [cpr, setCpr] = useState("");
  const [patientStudies, setPatientStudies] = useState([]);
  const [isShowInvalidCpr, setIsShowInvalidCpr] = useState(false);
  const [isShowStudiesModal, setIsShowStudiesModal] = useState(false);

  const handlePatientCprKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearchByCpr();
    }
  };

  const handleSearchByCpr = () => {
    console.log("Searching by cpr", cpr);
    patientservice
      .getPatientByCpr(cpr)
      .then((response) => {
        const patientStudies = response.data;
        console.log("Fetched patient studies", patientStudies);
        const isFound = patientStudies.length !== 0;
        setPatientStudies(patientStudies);
        setIsShowInvalidCpr(!isFound);
        setIsShowStudiesModal(isFound);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <div className="searchbarContainer">
        <span className="searchbarLabel">Search CPR: </span>
        <input
          type="text"
          className="form-control mt-3"
          style={{ width: "70%", height: "30px" }}
          placeholder="Ex: 1205736806"
          value={cpr}
          onChange={(e) => setCpr(e.target.value)}
          onKeyPress={(e) => handlePatientCprKeyPress(e)}
        />
      </div>
      {isShowInvalidCpr && (
        <span className="cprErrorMessage">
          No patients found with the given cpr
        </span>
      )}
      {isShowStudiesModal && (
        <StudiesModal
          patientStudies={patientStudies}
          handleCloseModal={() => setIsShowStudiesModal(false)}
        />
      )}
    </div>
  );
};

export default SearchBar;
