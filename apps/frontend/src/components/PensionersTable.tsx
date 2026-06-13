import { useNavigate } from "react-router-dom";
import toPesos from "../util/currency";

interface Pensioner {
  id: number;
  serial_number: string;
  control_number: string;
  rank: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  amount_centavos: number;
}

interface PensionersTableProps {
  pensioners: Pensioner[];
}

function PensionersTable({ pensioners }: PensionersTableProps) {
  const navigate = useNavigate();

  const handleAddPensioner = () => {
    navigate("/pensioner/create");
  };

  return (
    <>
      <h2>List of Pensioners</h2>
      <button onClick={handleAddPensioner}>Add New Pensioner</button>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Serial Nr</th>
            <th>Control Nr</th>
            <th>Rank</th>
            <th>Name</th>
            <th>Monthly Pension</th>

            <th></th>
          </tr>
        </thead>
        <tbody>
          {pensioners.map((pensioner: Pensioner) => (
            <tr key={pensioner.id}>
              <td>{pensioner.id}</td>
              <td>{pensioner.serial_number}</td>
              <td>{pensioner.control_number}</td>
              <td>{pensioner.rank}</td>
              <td>
                {pensioner.first_name} {pensioner.middle_name}{" "}
                {pensioner.last_name}
              </td>
              <td>{toPesos(pensioner.amount_centavos)}</td>
              <td>
                <button>View</button>
                <button>Edit</button>
                <button>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default PensionersTable;
