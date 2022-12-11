import React from "react";
import { convertDate } from "../../utils/dateUtil";

const PatientHeader = ({ patient }) => {
  return (
    <div className="patientHeader">
      <div
        className="patientHeaderRow"
        style={{ color: "#0d6efd", fontWeight: 500, marginBottom: "1%" }}
      >
        <span>{patient.full_name}</span>
        <span>{patient.cpr}</span>
      </div>
      <div className="patientHeaderRow">
        <span>Accession nr: {patient.accession}</span>
      </div>
      <div className="patientHeaderRow">
        <span>Date: {convertDate(patient.start)}</span>
      </div>
    </div>
  );
};

export default PatientHeader;
