import React from "react";
import { convertDate } from "../../utils/dateUtil";

const PatientHeader = ({ patient }) => {
  return (
    <div className="patientHeader">
      <div
        className="patientHeaderRow"
        style={{ color: "#0d6efd", fontWeight: 500, marginBottom: "1%" }}
      >
        <span>{patient && patient.full_name}</span>
        <span>{patient && patient.cpr}</span>
      </div>
      <div className="patientHeaderRow">
        <span>Accession nr: {patient && patient.accession}</span>
      </div>
      <div className="patientHeaderRow">
        <span>Date: {convertDate(patient && patient.start)}</span>
      </div>
    </div>
  );
};

export default PatientHeader;
