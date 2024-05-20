import React, { useState } from 'react';
import { Modal, Button, ListGroup, Pagination } from 'react-bootstrap';
import { format } from 'date-fns';

const CopyFileModal = ({ show, onHide, selectedFileId, data }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const filesPerPage = 5;

  const handleFileSelect = (file) => {
    setSelectedFile(file);
  };

  const handleCopyFile = () => {
    if (selectedFile) {
      console.log(`Copying file with ID: ${selectedFile.id}`);
      // Perform the file copying logic here
      onHide();
    }
  };

  const groupedData = data.reduce((acc, file) => {
    const date = format(new Date(file.date), 'dd/MM/yyyy');
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(file);
    return acc;
  }, {});

  const sortedDates = Object.keys(groupedData).sort((a, b) => new Date(b) - new Date(a));

  const indexOfLastFile = currentPage * filesPerPage;
  const indexOfFirstFile = indexOfLastFile - filesPerPage;
  const currentFiles = sortedDates
    .slice(indexOfFirstFile, indexOfLastFile)
    .flatMap((date) => groupedData[date]);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Modal show={show} onHide={onHide} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Select File to Copy</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ListGroup>
          {currentFiles.map((file) => (
            <React.Fragment key={file.id}>
              {groupedData[format(new Date(file.date), 'dd/MM/yyyy')][0] === file && (
                <ListGroup.Item className="fw-bold">{format(new Date(file.date), 'dd/MM/yyyy')}</ListGroup.Item>
              )}
              <ListGroup.Item
                action
                active={selectedFile && selectedFile.id === file.id}
                onClick={() => handleFileSelect(file)}
              >
                {file.title}
              </ListGroup.Item>
            </React.Fragment>
          ))}
        </ListGroup>
        <Pagination className="mt-3">
          {Array.from({ length: Math.ceil(sortedDates.length / filesPerPage) }).map((_, index) => (
            <Pagination.Item
              key={index}
              active={index + 1 === currentPage}
              onClick={() => paginate(index + 1)}
            >
              {index + 1}
            </Pagination.Item>
          ))}
        </Pagination>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleCopyFile}>
          Copy File
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CopyFileModal;