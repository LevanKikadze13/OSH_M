import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './MyCompanies.css';

const itemsPerPage = 11;

const MyCompanies = ({ data }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = data.slice(startIndex, endIndex);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
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
        <ul className="pagination justify-content-center">
          {pages}
        </ul>
      </nav>
    );
  };

  const renderCards = () => {
    const cards = currentData.map((item, index) => (
      <div key={index} className="col-lg-4 col-5 mb-4">
        <Link to={`/organization/${index}`} className="card-link">
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
                <p className="card-text">დამატება</p>
              </div>
            </div>
          </Link>
        </div>
      );
    }
    return cards;
  };

  return (
    <div className="container-fluid mt-3">
      <div className="row justify-content-center main-card-container">
        <div className="card-container">
          <div className="card-content">
            <div className="row text-center">
              {renderCards()}
            </div>
            <div className="pagination-container">
              {renderPagination()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyCompanies;