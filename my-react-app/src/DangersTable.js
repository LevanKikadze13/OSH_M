import React from 'react';
import { Table } from 'react-bootstrap';

const DangersTable = ({ existingMechanisms, additionalMechanisms }) => {
  return (
    <Table striped bordered hover>
      <thead>
        {/* Table header */}
      </thead>
      <tbody>
        {existingMechanisms.map((mechanism) => (
          <tr key={mechanism.id}>
            <td>{mechanism.name}</td>
            {/* Render other columns */}
          </tr>
        ))}
        {additionalMechanisms.map((mechanism) => (
          <tr key={mechanism.id}>
            <td></td>
            {/* Render other columns */}
            <td>{mechanism.hierarchy}</td>
            <td>{mechanism.name}</td>
            {/* Render person responsible and date of completion fields */}
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default DangersTable;