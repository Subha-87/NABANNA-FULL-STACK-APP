import { Table } from "react-bootstrap";
import "./TableStyle.css"

const SearchComplainTable = ({ complainData }) => {
  return (
    <Table striped bordered hover className="custom-table">
      <thead>
        <tr>
          <th>Serial</th>
          <th>Date</th>
          <th>Username</th>
          <th>Designation</th>
          <th>Department</th>

          <th>Problem</th>
          <th>Room</th>
          <th>Contact</th>
          <th>Status</th>
          <th>Remarks</th>
        </tr>
      </thead>
      <tbody>
        {complainData.map((data, index) => (
          <tr key={index}>
            <td>{index + 1} </td>
            <td>{new Date(data.date).toLocaleDateString()}</td>
            <td className="uppercase font-semibold"> {data.username}</td>
            <td className="w-[100px]">{data.designation}</td>
            <td className="uppercase">{data.department}</td>

            <td>
              {data.complain ? data.type + ":" + data.complain : data.type}
            </td>
            <td>{data.room}</td>

            <td>{data.contact}</td>
            <td>
              {data.status === "Pending" ? (
                <div className="spinner-grow text-danger"></div>
              ) : data.status === "In Progress" ? (
                <div className="spinner-grow text-warning">I</div>
              ) : (
                <button className="btn btn-success p-3 5em rounded-circle btn-sm"></button>
              )}
            </td>
            <td>{data.remarks}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default SearchComplainTable;
