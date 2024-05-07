import React, { useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import DangersTable from './DangersTable';
import ControlMechanisms from './ControlMechanisms';

const DangersTableTwo = ({ danger }) => {
  const [existingMechanisms, setExistingMechanisms] = useState([]);
  const [additionalMechanisms, setAdditionalMechanisms] = useState([]);
  const navigate = useNavigate();

  const handleMechanismSelection = (mechanism, option) => {
    if (option === 'exists') {
      setExistingMechanisms((prevMechanisms) => [...prevMechanisms, mechanism]);
    } else if (option === 'does not exist') {
      setAdditionalMechanisms((prevMechanisms) => [...prevMechanisms, mechanism]);
    }
  };

  const handleContinue = () => {
    navigate('/DangersDocument');
  };

  return (
    <Container>
      <Row>
        <Col>
          <h2>{danger.name}</h2>
          <DangersTable
            existingMechanisms={existingMechanisms}
            additionalMechanisms={additionalMechanisms}
          />
          <ControlMechanisms
            danger={danger}
            onMechanismSelection={handleMechanismSelection}
          />
          <Button variant="primary" onClick={handleContinue}>
            Continue and Choose Another Danger
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default DangersTableTwo;