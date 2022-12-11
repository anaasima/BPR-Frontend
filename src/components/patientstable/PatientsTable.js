import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import patientservice from "../../services/patientservice";
import { calculateTodayDateAsString } from "../../utils/dateUtil";
import AppHeader from "../AppHeader";
import TableContainer from "./TableContainer";
import "../../css/PatientsTable.css";
import SearchBar from "./SearchBar";

const PatientsTable = () => {
  const [patients, setPatients] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("app-token") === null) {
      navigate("/");
      return;
    }
    try {
      fetchPatientsConst();
    } catch (error) {
      console.log(error);
    }
  }, [navigate]);

  useEffect(() => {
    const interval = setInterval(() => {
      try {
        fetchPatientsConst();
      } catch (error) {
        console.log(error);
      }
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchPatientsConst = async () => {
    patientservice
      .get(calculateTodayDateAsString())
      .then((resp) => {
        let patients = resp.data;
        setPatients(patients);
      })
      .catch((err) => {
        console.log(err);
        if (err.response === undefined || err.response.status === 401) {
          localStorage.removeItem("app-token");
          navigate("/");
        }
      });
  };

  return (
    <div style={{ width: "96%" }}>
      <div className="headerContainer">
        <AppHeader onLogoClick={() => {}} isImageOnly={true} />
        <SearchBar />
      </div>
      <hr style={{ width: "98%", marginLeft: "2%" }} />
      {patients.length > 0 ? (
        <div className="patientsTableContainer" style={{ marginLeft: "2%" }}>
          <TableContainer patients={patients} />
        </div>
      ) : (
        <p className="noPatientsFoundText">
          No patients scheduled with the given criterias
        </p>
      )}
    </div>
  );
};

export default PatientsTable;
