import React from "react";
import TableRow from "./TableRow";

const TableContainer = ({ patients }) => {
  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th>Name</th>
          <th>Study</th>
          <th>Time</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {patients.map((patient) => {
          return <TableRow key={patient.accession} patient={patient} />;
        })}
      </tbody>
    </table>
  );
};

export default TableContainer;
