import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [data, setData] = useState("");
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/test"); //GET
      setData(await response.text());

      const employeesResponse = await fetch(
        "http://localhost:8000/api/employees",
      ); //GET
      const employeesData = await employeesResponse.json();
      setEmployees(employeesData);
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData(event.target);
    const payload = {
      email: formData.get("email"),
      first_name: formData.get("first_name"),
      last_name: formData.get("last_name"),
      salary: formData.get("salary"),
      date_hired: formData.get("date_hired"),
    };

    const response = await fetch("http://localhost:8000/api/employees", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      setLoading(false);
    }
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, [data]);

  return (
    <>
      <h1>{data}</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input id="email" name="email" required type="email" />
        </div>
        <div>
          <label htmlFor="first_name">First Name:</label>
          <input id="first_name" name="first_name" required type="text" />
        </div>

        <div>
          <label htmlFor="last_name">Last Name:</label>
          <input id="last_name" name="last_name" required type="text" />
        </div>

        <div>
          <label htmlFor="department">Department:</label>
          <select id="department" name="department" required>
            <option value="">Select a department</option>
            <option value="1">IT</option>
            <option value="2">Finance</option>
            <option value="3">HR</option>
            <option value="4">Admin</option>
          </select>
        </div>

        <div>
          <label htmlFor="salary">Salary:</label>
          <input id="salary" name="salary" required type="decimal" />
        </div>

        <div>
          <label htmlFor="date_hired">Date Hired:</label>
          <input id="date_hired" name="date_hired" required type="date" />
        </div>

        <div>
          <button type="submit" disabled={loading}>
            {loading ? "Saving..." : "Save"}
          </button>
          <button type="button">Cancel</button>
        </div>
      </form>

      <h2>List of Employees:</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Date Hired</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee: any) => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.first_name}</td>
              <td>{employee.last_name}</td>
              <td>{employee.date_hired}</td>
              <td>
                <button type="button">Edit</button>
                <button type="button">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default App;
