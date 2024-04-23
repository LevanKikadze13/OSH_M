import React, { useState } from 'react';
import { Container, Row, Col, Button, Modal, Form, Card } from 'react-bootstrap';

const ProfileDetails = () => {
  const [name, setName] = useState('John Doe');
  const [email, setEmail] = useState('johndoe@example.com');
  const [phone, setPhone] = useState('1234567890');
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showPhoneModal, setShowPhoneModal] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [newPhone, setNewPhone] = useState('');

  const handlePasswordChange = () => {
    // Logic to handle password change
    setShowPasswordModal(false);
    // Update password state or perform any other necessary actions
  };

  const handlePhoneChange = () => {
    // Logic to handle phone number change
    setShowPhoneModal(false);
    setPhone(newPhone);
  };

  return (
    <Container className="my-4 d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
      <Row>
        <Col>
          <Card className="shadow-lg">
            <Card.Body>
              <Card.Title as="h2" className="mb-4 text-center">
                Profile Details
              </Card.Title>
              <Row className="mb-3">
                <Col sm={4}>
                  <strong>Name:</strong>
                </Col>
                <Col sm={8}>{name}</Col>
              </Row>
              <Row className="mb-3">
                <Col sm={4}>
                  <strong>Email:</strong>
                </Col>
                <Col sm={8}>{email}</Col>
              </Row>
              <Row className="mb-3">
                <Col sm={4}>
                  <strong>Password:</strong>
                </Col>
                <Col sm={8}>
                  ********{' '}
                  <Button variant="link" onClick={() => setShowPasswordModal(true)}>
                    Change Password
                  </Button>
                </Col>
              </Row>
              <Row>
                <Col sm={4}>
                  <strong>Phone Number:</strong>
                </Col>
                <Col sm={8}>
                  {phone}{' '}
                  <Button variant="link" onClick={() => setShowPhoneModal(true)}>
                    Change Phone Number
                  </Button>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Change Password Modal */}
      <Modal show={showPasswordModal} onHide={() => setShowPasswordModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Change Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="formNewPassword">
            <Form.Label>New Password</Form.Label>
            <Form.Control
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowPasswordModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handlePasswordChange}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Change Phone Number Modal */}
      <Modal show={showPhoneModal} onHide={() => setShowPhoneModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Change Phone Number</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="formNewPhone">
            <Form.Label>New Phone Number</Form.Label>
            <Form.Control
              type="tel"
              value={newPhone}
              onChange={(e) => setNewPhone(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowPhoneModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handlePhoneChange}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default ProfileDetails;