import React, { useState } from 'react';
import { Container, Row, Col, Button, Modal, Form, Card } from 'react-bootstrap';

const ProfileDetails = () => {
  const [name, setName] = useState('John Doe');
  const [email, setEmail] = useState('johndoe@example.com');
  const [phone, setPhone] = useState('1234567890');
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showPhoneModal, setShowPhoneModal] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [newPhone, setNewPhone] = useState('');

  const handlePasswordChange = () => {
    if (newPassword !== repeatPassword) {
      setPasswordError('Passwords do not match');
      return;
    }

    // Logic to handle password change
    setShowPasswordModal(false);
    setNewPassword('');
    setRepeatPassword('');
    setPasswordError('');
    // Update password state or perform any other necessary actions
  };

  const handlePhoneChange = () => {
    // Logic to handle phone number change
    setShowPhoneModal(false);
    setPhone(newPhone);
  };

  const resetPasswordFields = () => {
    setNewPassword('');
    setRepeatPassword('');
  };

  const clearPasswordError = () => {
    setPasswordError('');
  };

  const isPasswordValid = () => {
    return newPassword.length > 0 && repeatPassword.length > 0;
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
                  სახელი-გვარი: &nbsp;&nbsp;&nbsp; {name}
                </Col>
              </Row>
              <Row className="mb-4 pb-3 border-bottom w-100">
                <Col>
                  ელ-ფოსტა:&nbsp;&nbsp;&nbsp; {email}
                </Col>
              </Row>
              <Row className="mb-4 pb-3 border-bottom align-items-center w-100">
                <Col className="d-flex align-items-center justify-content-between">
                  პაროლი: &nbsp;&nbsp;&nbsp; *******
                  <Button className="btn btn-primary" onClick={() => setShowPasswordModal(true)}>
                    პაროლის შეცვლა
                  </Button>
                </Col>
              </Row>
              <Row className=" pb-3 align-items-center w-100">
                <Col className="d-flex align-items-center justify-content-between">
                  ტელეფონის ნომერი:&nbsp;&nbsp;&nbsp; +995 {phone}
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
      <Modal
        show={showPasswordModal}
        onHide={() => {
          setShowPasswordModal(false);
          resetPasswordFields();
          clearPasswordError();
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>პაროლის შეცვლა</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="formNewPassword">
            <Form.Label>ახალი პაროლი:</Form.Label>
            <Form.Control
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="formRepeatPassword" className="mt-3">
            <Form.Label>გაიმეორეთ პაროლი:</Form.Label>
            <Form.Control
              type="password"
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
              required
            />
          </Form.Group>
          {passwordError && <div className="text-danger mt-2">{passwordError}</div>}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowPasswordModal(false)}>
            გაუქმება
          </Button>
          <Button
            variant="primary"
            onClick={handlePasswordChange}
            disabled={!isPasswordValid()}
          >
            შენახვა
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Change Phone Number Modal */}
      <Modal show={showPhoneModal} onHide={() => setShowPhoneModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>ნომრის შეცვლა</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="formNewPhone">
            <Form.Label>ახალი ტელეფონის ნომერი:</Form.Label>
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