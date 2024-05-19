import React from 'react';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

const ContactInfo = () => {
  return (
    <Container className="my-5  ">
      <Row>
        <Col md={6}>
          <Card className="border-0 shadow-sm">
            <Card.Body>
              <Card.Title className="mb-4">Contact Information</Card.Title>
              <div className="d-flex align-items-center mb-3">
                <FaEnvelope className="me-3 fs-4 text-primary" />
                <div>
                  <h6 className="mb-1">Email Address</h6>
                  <p className="mb-0">info@example.com</p>
                </div>
              </div>
              <div className="d-flex align-items-center mb-3">
                <FaPhone className="me-3 fs-4 text-primary" />
                <div>
                  <h6 className="mb-1">Phone Number</h6>
                  <p className="mb-0">+1 (123) 456-7890</p>
                </div>
              </div>
              <div className="d-flex align-items-center">
                <FaMapMarkerAlt className="me-3 fs-4 text-primary" />
                <div>
                  <h6 className="mb-1">Address</h6>
                  <p className="mb-0">123 Main St, City, State, ZIP</p>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ContactInfo;