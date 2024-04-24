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
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col xs={12} md={10} lg={8}>
          <Card className="shadow">
            <Card.Body>
              <Card.Title as="h2" className="mb-3 pb-5 border-bottom text-center w-100">
                პროფილის დეტალები
              </Card.Title>
              <Row className="mb-4 pb-3 border-bottom w-100">
                <Col>
                  <strong>სახელი-გვარი: &nbsp;&nbsp;&nbsp;&nbsp; {name}</strong>
                </Col>
              </Row>
              <Row className="mb-4 pb-3 border-bottom w-100">
                <Col>
                  <strong>ელ-ფოსტა: &nbsp;&nbsp;&nbsp;&nbsp; {email}</strong>
                </Col>
              </Row>
              <Row className="mb-4 pb-3 border-bottom align-items-center w-100">
                <Col className="d-flex align-items-center justify-content-between">
                  <strong>პაროლი: &nbsp;&nbsp;&nbsp;&nbsp; *******</strong>
                  <Button className="btn btn-primary" onClick={() => setShowPasswordModal(true)}>
                    პაროლის შეცვლა
                  </Button>
                </Col>
              </Row>
              <Row className="mb-4 pb-3 border-bottom align-items-center w-100">
                <Col className="d-flex align-items-center justify-content-between">
                  <strong>ტელეფონის ნომერი: &nbsp;&nbsp;&nbsp;&nbsp; {phone}</strong>
                  <Button className="btn btn-primary" onClick={() => setShowPhoneModal(true)}>
                    ნომრის შეცვლა
                  </Button>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Change Password Modal */}
      <Modal show={showPasswordModal} onHide={() => setShowPasswordModal(false)} >
        <Modal.Header closeButton>
          <Modal.Title>პაროლის შეცვლა</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="formNewPassword">
            <Form.Label>ახალი პაროლი</Form.Label>
            <Form.Control
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowPasswordModal(false)}>
            გაუქმება
          </Button>
          <Button variant="primary" onClick={handlePasswordChange}>
            შენახვა
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Change Phone Number Modal */}
      <Modal show={showPhoneModal} onHide={() => setShowPhoneModal(false)} >
        <Modal.Header closeButton>
          <Modal.Title>ნომრის შეცვლა</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="formNewPhone">
            <Form.Label>ახალი ტელეფონის ნომერი</Form.Label>
            <Form.Control
              type="tel"
              pattern="[0-9]{9}"
              value={newPhone}
              onChange={(e) => setNewPhone(e.target.value)}
              required
            />
            <Form.Control.Feedback type="invalid">
              შეიყვანეთ ვალიდური 9 ნიშნა ნომერი
            </Form.Control.Feedback>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowPhoneModal(false)}>
            გაუქმება
          </Button>
          <Button variant="primary" onClick={handlePhoneChange} disabled={!/^[0-9]{9}$/.test(newPhone)}>
            შენახვა
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default ProfileDetails;