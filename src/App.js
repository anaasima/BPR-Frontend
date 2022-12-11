import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Patient from "./components/patient/Patient";
import PatientsTable from "./components/patientstable/PatientsTable";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/patients" element={<PatientsTable />} />
        <Route path="/patients/:patientId" element={<Patient />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
