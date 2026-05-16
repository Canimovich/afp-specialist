import "./App.css";
import EmployeeTable from "./components/EmployeeTable";
import { useState, useEffect } from "react";
import { fetchAllEmployees } from "./services/employeeService";
import type { Employee } from "./types/employee";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import CreateEmployee from "./pages/CreateEmployee";

function App() {
  const [employees, setEmployees] = useState([] as Employee[]);

  const fetchData = async () => {
    const data = await fetchAllEmployees();
    setEmployees(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <BrowserRouter>
        <h1>Employee Management System</h1>
        <Routes>
          <Route path="/" element={<EmployeeTable employees={employees} />} />
          <Route path="/employees/create" element={<CreateEmployee />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
