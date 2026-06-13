import { useEffect } from "react";
import PensionersForm from "../components/PensionersForm";
import { fetchAllPensioners } from "../services/pensionerService";

function CreatePensioner() {
  const fetchData = async () => {
    await fetchAllPensioners();
  };

  useEffect(() => {
    fetchData();
  }, []); //fetch data on component mount
  return <PensionersForm loadPensioners={fetchData} />;
}

export default CreatePensioner;
