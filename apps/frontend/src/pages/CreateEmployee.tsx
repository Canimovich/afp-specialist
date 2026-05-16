import { useEffect } from "react";
import { fetchAllEmployees } from "../services/employeeService";
import EmployeeForm from "../components/EmployeeForm";

function CreateEmployee() {
  const fetchData = async () => {
    await fetchAllEmployees();
  };

  useEffect(() => {
    fetchData();
  }, []);

  return <EmployeeForm loadEmployees={fetchData} />;
}

export default CreateEmployee;
