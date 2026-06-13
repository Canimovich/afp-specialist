import { useState, useEffect } from "react";
import EmployeeTable from "./components/EmployeeTable";
import CreateEmployee from "./pages/CreateEmployee";
import { fetchAllEmployees } from "./services/employeeService";
import type { Employee } from "./types/employee";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import "./App.css";
import CreatePensioner from "./pages/CreatePensioner";

function App() {
  //props -> properties, parameter pipasan
  const [employees, setEmployees] = useState([] as Employee[]);

  useEffect(() => {
    fetchAllEmployees()
      .then((data) => {
        setEmployees(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []); //fetch data on component mount

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<EmployeeTable employees={employees} />} />
          <Route path="/employee/create" element={<CreateEmployee />} />
          <Route path="/pensioner/create" element={<CreatePensioner />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
