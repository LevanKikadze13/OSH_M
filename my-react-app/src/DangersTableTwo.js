import React, { useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import DangersTable from './DangersTable';
import ControlMechanisms from './ControlMechanisms';
import './DangersTableTwo.css';
import DangersDocument from './DangersDocument';

const DangersTableTwo = ({ danger }) => {
  const [existingMechanisms, setExistingMechanisms] = useState([]);
  const [additionalMechanisms, setAdditionalMechanisms] = useState([]);
  const [showDangersDocument, setShowDangersDocument] = useState(false);
  const navigate = useNavigate();

  const handleMechanismSelection = (mechanism, option) => {
    if (option === 'yes') {
      setExistingMechanisms((prevMechanisms) => [...prevMechanisms, mechanism]);
      setAdditionalMechanisms((prevMechanisms) =>
        prevMechanisms.filter((m) => m.id !== mechanism.id)
      );
    } else if (option === 'no') {
      setAdditionalMechanisms((prevMechanisms) => [...prevMechanisms, mechanism]);
      setExistingMechanisms((prevMechanisms) =>
        prevMechanisms.filter((m) => m.id !== mechanism.id)
      );
    } else if (option === 'not-required') {
      setExistingMechanisms((prevMechanisms) =>
        prevMechanisms.filter((m) => m.id !== mechanism.id)
      );
      setAdditionalMechanisms((prevMechanisms) =>
        prevMechanisms.filter((m) => m.id !== mechanism.id)
      );
    }
  };

  const handleRemoveMechanism = (mechanismId) => {
    setExistingMechanisms((prevMechanisms) =>
      prevMechanisms.filter((m) => m.id !== mechanismId)
    );
    setAdditionalMechanisms((prevMechanisms) =>
      prevMechanisms.filter((m) => m.id !== mechanismId)
    );
  };

  const handleContinue = () => {
    setShowDangersDocument(true);
  };

  const handleBackToDangers = () => {
    navigate(-1);
  };

  const handleFinish = () => {
    navigate('/companyfiles');
  };

  if (showDangersDocument) {
    return (
      <DangersDocument
        name={danger.name}
        fieldOfWork={danger.fieldOfWork}
        onBack={handleBackToDangers}
      />
    );
  }

  return (
    <Container className="dangers-table-two">
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
            existingMechanisms={existingMechanisms}
            additionalMechanisms={additionalMechanisms}
            onRemoveMechanism={handleRemoveMechanism}
          />
          <div className="d-flex justify-content-between mt-4">
            <Button variant="secondary" size="lg" onClick={handleBackToDangers}>
              Back to Dangers
            </Button>
            <div>
              <Button variant="primary" size="lg" onClick={handleContinue} className="me-2">
                Continue and Choose Another Danger
              </Button>
              <Button variant="success" size="lg" onClick={handleFinish}>
                Finish
              </Button>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default DangersTableTwo;