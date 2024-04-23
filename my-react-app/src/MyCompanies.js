import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { Dropdown } from 'react-bootstrap';
import './MyCompanies.css';

const itemsPerPage = 11;

const MyCompanies = ({ data }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [openDropdownIndex, setOpenDropdownIndex] = useState(null); // State to track which dropdown is open

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = data.slice(startIndex, endIndex);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleBurgerMenuClick = (event, index) => {
    event.stopPropagation(); // Stop the event from propagating to the card link
    event.preventDefault()
    setOpenDropdownIndex(index === openDropdownIndex ? null : index); // Toggle dropdown
  };

  const handleLinkClick = (event, index) => {
    if (openDropdownIndex !== null) {
      setOpenDropdownIndex(null); // Close dropdown if any dropdown is open
    }
  };

  const renderPagination = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <li key={i} className={`page-item ${currentPage === i ? 'active' : ''}`}>
          <button className="page-link" onClick={() => handlePageChange(i)}>
            {i}
          </button>
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
      <div key={index} className="col-lg-4 col-5 mb-4">
        <Link
          to={`/organization/${index}`}
          className="card-link"
          onClick={(event) => handleLinkClick(event, index)}
        >
          <BurgerMenu
            handleBurgerMenuClick={(event) => handleBurgerMenuClick(event, index)}
            isOpen={openDropdownIndex === index}
          />

          <div className="card my-companies-card">
            <div className="card-body">
              <h5 className="card-title border-bottom pb-3">{item.title}</h5>
              <p className="card-text">{item.description}</p>
            </div>

          </div>
        </Link>
      </div>
    ));

    if (currentPage === 1) {
      cards.unshift(
        <div key="add-new" className="col-lg-4 col-5 mb-4">
          <Link to="/add-organization" className="card-link">
            <div className="card my-companies-card add-new-card">
              <div className="card-body">
                <h5 className="card-title border-bottom pb-3">ახალი ორგანიზაცია</h5>
                <p className="card-text">
                  დამატება <FontAwesomeIcon className="ms-1 add-organization" icon={faPlus} />
                </p>
              </div>
            </div>
          </Link>
        </div>
      );
    }
    return cards;
  };

  const BurgerMenu = ({ handleBurgerMenuClick, isOpen }) => {
    return (
      <Dropdown className="burger-menu" show={isOpen} onClose={() => setOpenDropdownIndex(null)}>
        <Dropdown.Toggle
          variant="link"
          id="burger-menu-dropdown"
          onClick={handleBurgerMenuClick}
        >
          <FontAwesomeIcon icon={faEllipsisV} />
        </Dropdown.Toggle>
        <Dropdown.Menu className='dropdown-menu'>
          <Dropdown.Item><button type="button" class="btn btn-primary input-block-level form-control">რედაქტირება</button></Dropdown.Item>
          <Dropdown.Item><button type="button" class="btn btn-danger input-block-level form-control">წაშლა</button></Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );
  };

  return (
    <div className="container-fluid mt-3">
      <div className="row justify-content-center main-card-container">
        <div className="card-container">
          <div className="card-content">
            <div className="row text-center">{renderCards()}</div>
            <div className="pagination-container">{renderPagination()}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyCompanies;
