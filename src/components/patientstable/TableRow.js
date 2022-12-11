import React from "react";
import { useNavigate } from "react-router-dom";

const TableRow = ({ patient }) => {
  const navigate = useNavigate();

  const handleNavigateToPatient = (patient) => {
    navigate(`/patients/${patient.accession}`, {
      state: { ...patient },
    });
  };

  return (
    <tr
      key={patient.accession}
      onClick={() => handleNavigateToPatient(patient)}
    >
      <td>{patient.full_name}</td>
      <td>{patient.study}</td>
      <td>{patient.start.split("T")[1].substring(0, 5)}</td>
      <td
        style={
          patient.status === "Finished"
            ? { color: "#0d6efd", fontWeight: 500 }
            : {}
        }
      >
        {patient.status}
      </td>
    </tr>
  );
};

export default TableRow;
