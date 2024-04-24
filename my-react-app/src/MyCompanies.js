import React, { useState } from 'react';
import { Container, Row, Col, Button, Modal, Form, Card, Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import './MyCompanies.css';

const itemsPerPage = 11;

const MyCompanies = ({ data }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [openDropdownIndex, setOpenDropdownIndex] = useState(null);
  const [showOrganizationModal, setShowOrganizationModal] = useState(false);
  const [newOrganization, setNewOrganization] = useState({ name: '', description: '' });

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = data.slice(startIndex, endIndex);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleBurgerMenuClick = (event, index) => {
    event.stopPropagation();
    event.preventDefault();
    setOpenDropdownIndex(index === openDropdownIndex ? null : index);
  };

  const handleLinkClick = (event, index) => {
    if (openDropdownIndex !== null) {
      setOpenDropdownIndex(null);
    }
  };

  const handleOrganizationSubmit = () => {
    // Handle the submission of the new organization
    console.log('New Organization:', newOrganization);
    setNewOrganization({ name: '', description: '' });
    setShowOrganizationModal(false);
  };

  const renderPagination = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <li key={i} className={`page-item ${currentPage === i ? 'active' : ''}`}>
          <Button variant="link" className="page-link" onClick={() => handlePageChange(i)}>
            {i}
          </Button>
        </li>
      );
    }
    return (
      <nav aria-label="Page navigation">
        <ul className="pagination justify-content-center">{pages}</ul>
      </nav>
    );
  };

  const renderCards = () => {
    const cards = currentData.map((item, index) => (
      <Col lg={4} xs={5} className="mb-4" key={index}>
        <Link
          to={`/organization/${index}`}
          className="card-link"
          onClick={(event) => handleLinkClick(event, index)}
        >
          <BurgerMenu
            handleBurgerMenuClick={(event) => handleBurgerMenuClick(event, index)}
            isOpen={openDropdownIndex === index}
          />

          <Card className="my-companies-card">
            <Card.Body>
              <Card.Title className="border-bottom pb-3">{item.title}</Card.Title>
              <Card.Text>{item.description}</Card.Text>
            </Card.Body>
          </Card>
        </Link>
      </Col>
    ));

    if (currentPage === 1) {
      cards.unshift(
        <Col lg={4} xs={5} className="mb-4" key="add-new">
          <div className="card-link" onClick={() => setShowOrganizationModal(true)}>
            <Card className="my-companies-card add-new-card">
              <Card.Body>
                <Card.Title className="border-bottom pb-3">ახალი ორგანიზაცია</Card.Title>
                <Card.Text>
                  დამატება <FontAwesomeIcon className="ms-1 add-organization" icon={faPlus} />
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
        </Col>
      );
    }
    return cards;
  };

  const BurgerMenu = ({ handleBurgerMenuClick, isOpen }) => {
    return (
      <Dropdown className="burger-menu" show={isOpen} onToggle={() => setOpenDropdownIndex(null)}>
        <Dropdown.Toggle
          variant="link"
          id="burger-menu-dropdown"
          onClick={handleBurgerMenuClick}
        >
          <FontAwesomeIcon icon={faEllipsisV} />
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item>
            <Button variant="primary" className="input-block-level form-control">
              რედაქტირება
            </Button>
          </Dropdown.Item>
          <Dropdown.Item>
            <Button variant="danger" className="input-block-level form-control">
              წაშლა
            </Button>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );
  };

  return (
    <div>
      <Container fluid className="mt-3">
        <Row className="justify-content-center main-card-container">
          <div className="card-container">
            <div className="card-content">
              <Row className="text-center">{renderCards()}</Row>
              <div className="pagination-container">{renderPagination()}</div>
            </div>
          </div>
        </Row>
        <Modal show={showOrganizationModal} onHide={() => setShowOrganizationModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Organization</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="organizationName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={newOrganization.name}
                onChange={(e) =>
                  setNewOrganization({ ...newOrganization, name: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="organizationDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={newOrganization.description}
                onChange={(e) =>
                  setNewOrganization({ ...newOrganization, description: e.target.value })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowOrganizationModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleOrganizationSubmit}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
      </Container>

      
    </div>
  );
};

export default MyCompanies;