import React from "react";
import { useNavigate } from "react-router-dom";

const StudiesModal = ({ patientStudies, handleCloseModal }) => {
  const navigate = useNavigate();

  const handleNavigateToPatient = (patient) => {
    navigate(`/patients/${patient.accession}`, {
      state: { ...patient },
    });
  };

  return (
    <div className="patientByCprModal" onClick={() => handleCloseModal()}>
      <div className="pt-2 ml-3 mr-3 patientsByCprContainerDiv">
        <div className="patientsByCprHeaderDiv">
          <span style={{ display: "block" }}>
            {patientStudies[0].full_name}
          </span>
          <span style={{ float: "right" }}>{patientStudies[0].cpr}</span>
        </div>
        <table className="mt-3" style={{ width: "96%" }}>
          <tbody>
            {patientStudies.map((patient) => (
              <tr
                key={patient.accession}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                onClick={() => handleNavigateToPatient(patient)}
                className="patientByCprTableRow"
              >
                <td>{patient.accession}</td>
                <td>{patient.study}</td>
                <td>{patient.start.split("T")[1].substring(0, 5)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudiesModal;
