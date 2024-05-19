import React from 'react';
import { Container, Row, Col, Card, Table, Image } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faCalendar, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import './DangerSummary.css';

const DangerSummary = () => {
  // Dummy data for metadata
  const metadata = {
    name: 'John Doe',
    companyName: 'ABC Company',
    companyAddress: '123 Main St, City',
    fieldOfWork: 'Construction',
    workDescription: 'Building construction project',
    revisionDate: '2023-06-30',
  };

  // Dummy data for selected dangers
  const selectedDangers = [
    {
      id: 1,
      name: 'Falling Objects',
      damageType: 'Physical injury',
      image: 'https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg',
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
    // Add more dummy selected dangers as needed
  ];

  return (
    <Container className="dangers-summary">
      {/* Metadata */}
      <Row>
        <Col>
          <h1 className="text-center mb-4">Dangers Summary</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Metadata</Card.Title>
              <Table bordered responsive>
                <tbody>
                  {/* Metadata table */}
                  <tr>
                    <th>Assessor Name</th>
                    <td>{metadata.name}</td>
                  </tr>
                  <tr>
                    <th>Company Name</th>
                    <td>{metadata.companyName}</td>
                  </tr>
                  <tr>
                    <th>Company Address</th>
                    <td>{metadata.companyAddress}</td>
                  </tr>
                  <tr>
                    <th>Field of Work</th>
                    <td>{metadata.fieldOfWork}</td>
                  </tr>
                  <tr>
                    <th>Work Description</th>
                    <td>{metadata.workDescription}</td>
                  </tr>
                  <tr>
                    <th>Revision Date</th>
                    <td>{metadata.revisionDate}</td>
                  </tr>
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Selected Dangers */}
      {selectedDangers.map((danger) => (
        <Row key={danger.id} className="mb-4">
          <Col>
            <Card>
              <Card.Body>
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <Image src={danger.image} alt={danger.name} fluid className="danger-image me-3" />
                  <div>
                    <Card.Title>{danger.name}</Card.Title>
                    <Card.Text>{danger.damageType}</Card.Text>
                  </div>
                  <div></div>
                </div>
                <Table bordered responsive>
                  <thead>
                    <tr>
                      <th className="text-center">Existing Control Mechanisms</th>
                      <th colSpan={3} className="text-center">Existing Risk</th>
                      <th className="text-center">Additional Control Mechanisms</th>
                      <th colSpan={3} className="text-center">Risk Left</th>
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
                          <div key={mechanism.id} className="mechanism-item bg-success text-white">
                            <div className="d-flex align-items-center justify-content-center mb-2">
                              <FontAwesomeIcon icon={faExclamationTriangle} className="text-white me-2" />
                              <span>{mechanism.name}</span>
                            </div>
                          </div>
                        ))}
                      </td>
                      <td colSpan={3}></td>
                      <td>
                        {danger.additionalMechanisms.map((mechanism) => (
                          <div key={mechanism.id} className="mechanism-item bg-warning text-dark">
                            <div className="d-flex align-items-center justify-content-between mb-2">
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
    </Container>
  );
};

export default DangerSummary;