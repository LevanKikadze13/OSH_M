import React, { useState } from 'react';
import { Container, Row, Col, Card, Table, Image, Button, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faCalendar, faExclamationTriangle, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import './DangerSummaryEdit.css';
import DangersDocument from './DangersDocument';

const DangerSummaryEdit = ({ onSave }) => {
  const [metadata, setMetadata] = useState({
    name: 'John Doe',
    companyName: 'ABC Company',
    companyAddress: '123 Main St, City',
    fieldOfWork: 'Construction',
    workDescription: 'Building construction project',
    revisionDate: '2023-06-30',
  });

  const [selectedDangers, setSelectedDangers] = useState([
    {
      id: 1,
      name: 'Falling Objects',
      damageType: 'Physical injury',
      image: 'https://example.com/falling-objects.jpg',
      responsiblePeople: 'Safety Manager',
      revisionDate: '2023-07-15',
      existingMechanisms: [
        { id: 1, name: 'Hard hats provided' },
        { id: 2, name: 'Safety nets installed' },
      ],
      additionalMechanisms: [
        { id: 3, name: 'Install toe boards', category: 'Administrative control' },
        { id: 4, name: 'Provide safety glasses', category: 'Individual protection' },
      ],
    },
    {
      id: 2,
      name: 'Electrical Hazards',
      damageType: 'Electric shock',
      image: 'https://example.com/electrical-hazards.jpg',
      responsiblePeople: 'Electrical Engineer',
      revisionDate: '2023-08-01',
      existingMechanisms: [
        { id: 5, name: 'GFCI outlets installed' },
        { id: 6, name: 'Regular equipment inspections' },
      ],
      additionalMechanisms: [
        { id: 7, name: 'Provide electrical safety training', category: 'Administrative control' },
        { id: 8, name: 'Use insulated tools', category: 'Individual protection' },
      ],
    },
  ]);

  const [showDangersDocument, setShowDangersDocument] = useState(false);
  const navigate = useNavigate();

  const handleMetadataChange = (field, value) => {
    setMetadata((prevMetadata) => ({
      ...prevMetadata,
      [field]: value,
    }));
  };

  const handleRemoveDanger = (dangerId) => {
    setSelectedDangers((prevDangers) => prevDangers.filter((danger) => danger.id !== dangerId));
  };

  const handleSave = () => {
    onSave({ metadata, selectedDangers });
  };

  const handleAddDanger = () => {
    setShowDangersDocument(true);
  };

  const handleDangersDocumentClose = () => {
    setShowDangersDocument(false);
  };

  const handleDangersDocumentSave = (newDanger) => {
    setSelectedDangers((prevDangers) => [...prevDangers, newDanger]);
    setShowDangersDocument(false);
  };

  const handleBack = () => {
    navigate('/companyfiles');
  };

  if (showDangersDocument) {
    return (
      <DangersDocument
        metadata={metadata}
        onClose={handleDangersDocumentClose}
        onSave={handleDangersDocumentSave}
      />
    );
  }

  return (
    <Container className="danger-summary-edit my-4">
      <Row>
        <Col>
          <h1 className="text-center mb-4">Edit Dangers Summary</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Metadata</Card.Title>
              <Form>
                <Form.Group as={Row} controlId="assessorName" className="mb-3">
                  <Form.Label column sm={3}>
                    Assessor Name
                  </Form.Label>
                  <Col sm={9}>
                    <Form.Control
                      type="text"
                      value={metadata.name}
                      onChange={(e) => handleMetadataChange('name', e.target.value)}
                    />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="companyName" className="mb-3">
                  <Form.Label column sm={3}>
                    Company Name
                  </Form.Label>
                  <Col sm={9}>
                    <Form.Control
                      type="text"
                      value={metadata.companyName}
                      onChange={(e) => handleMetadataChange('companyName', e.target.value)}
                    />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="companyAddress" className="mb-3">
                  <Form.Label column sm={3}>
                    Company Address
                  </Form.Label>
                  <Col sm={9}>
                    <Form.Control
                      type="text"
                      value={metadata.companyAddress}
                      onChange={(e) => handleMetadataChange('companyAddress', e.target.value)}
                    />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="fieldOfWork" className="mb-3">
                  <Form.Label column sm={3}>
                    Field of Work
                  </Form.Label>
                  <Col sm={9}>
                    <Form.Control
                      type="text"
                      value={metadata.fieldOfWork}
                      onChange={(e) => handleMetadataChange('fieldOfWork', e.target.value)}
                    />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="workDescription" className="mb-3">
                  <Form.Label column sm={3}>
                    Work Description
                  </Form.Label>
                  <Col sm={9}>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      value={metadata.workDescription}
                      onChange={(e) => handleMetadataChange('workDescription', e.target.value)}
                    />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="revisionDate">
                  <Form.Label column sm={3}>
                    Revision Date
                  </Form.Label>
                  <Col sm={9}>
                    <Form.Control
                      type="date"
                      value={metadata.revisionDate}
                      onChange={(e) => handleMetadataChange('revisionDate', e.target.value)}
                    />
                  </Col>
                </Form.Group>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {selectedDangers.map((danger) => (
        <Row key={danger.id} className="mb-4">
          <Col>
            <Card>
              <Card.Body>
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <div className="d-flex align-items-center">
                    <Image src={danger.image} alt={danger.name} fluid className="danger-image me-3" />
                    <div>
                      <h4>{danger.name}</h4>
                      <p>{danger.damageType}</p>
                    </div>
                  </div>
                  <Button variant="danger" onClick={() => handleRemoveDanger(danger.id)}>
                    <FontAwesomeIcon icon={faTrash} />
                  </Button>
                </div>
                <Table bordered responsive>
                  <thead>
                    <tr>
                      <th className="text-center">Existing Control Mechanisms</th>
                      <th colSpan={3} className="text-center">
                        Existing Risk
                      </th>
                      <th className="text-center">Additional Control Mechanisms</th>
                      <th colSpan={3} className="text-center">
                        Risk Left
                      </th>
                      <th className="text-center">Revision Date</th>
                    </tr>
                    <tr>
                      <th></th>
                      <th className="text-center">P</th>
                      <th className="text-center">R</th>
                      <th className="text-center">Risk Level</th>
                      <th></th>
                      <th className="text-center">P</th>
                      <th className="text-center">R</th>
                      <th className="text-center">Risk Level</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        {danger.existingMechanisms.map((mechanism) => (
                          <div key={mechanism.id} className="mechanism-item bg-success text-white mb-2">
                            <div className="d-flex align-items-center justify-content-center">
                              <FontAwesomeIcon icon={faExclamationTriangle} className="text-white me-2" />
                              <span>{mechanism.name}</span>
                            </div>
                          </div>
                        ))}
                      </td>
                      <td colSpan={3}></td>
                      <td>
                        {danger.additionalMechanisms.map((mechanism) => (
                          <div key={mechanism.id} className="mechanism-item bg-warning text-dark mb-2">
                            <div className="d-flex align-items-center justify-content-between">
                              <div className="d-flex align-items-center">
                                <FontAwesomeIcon icon={faExclamationTriangle} className="text-dark me-2" />
                                <span>{mechanism.name}</span>
                              </div>
                              <span className="text-muted">{mechanism.category}</span>
                            </div>
                          </div>
                        ))}
                      </td>
                      <td colSpan={3}></td>
                      <td className="text-center">{danger.revisionDate}</td>
                    </tr>
                  </tbody>
                </Table>
                <div className="d-flex justify-content-between mt-3">
                  <div>
                    <FontAwesomeIcon icon={faUser} className="text-primary me-2" />
                    <span>{danger.responsiblePeople}</span>
                  </div>
                  <div>
                    <FontAwesomeIcon icon={faCalendar} className="text-primary me-2" />
                    <span>{danger.revisionDate}</span>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      ))}

      <Row className="mt-4">
        <Col className="text-end">
          <Button variant="secondary" onClick={handleBack} className="me-2">
            Back
          </Button>
          <Button variant="primary" onClick={handleSave} className="me-2">
            Save
          </Button>
          <Button variant="success" onClick={handleAddDanger}>
            <FontAwesomeIcon icon={faPlus} className="me-2" />
            Add Another Danger
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default DangerSummaryEdit;