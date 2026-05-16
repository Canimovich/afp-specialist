import { useEffect } from "react";
import { fetchAllEmployees } from "../services/employeeService";
import EmployeeForm from "../components/EmployeeForm";

function UpdateEmployee({ id }: { id: string }) {
  const fetchData = async () => {
    await fetchAllEmployees();
  };

  useEffect(() => {
    fetchData();
  }, []);
  return <EmployeeForm loadEmployees={fetchData} />;
}

export default UpdateEmployee;
