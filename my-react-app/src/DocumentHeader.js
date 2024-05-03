import React, { useState } from 'react';
import Autosuggest from 'react-autosuggest';
import 'bootstrap/dist/css/bootstrap.min.css';
import './DocumentHeader.css';

const fieldOfWorkOptions = ['Construction', 'School', 'Retail', 'Healthcare', 'Manufacturing', 'Technology', 'Finance'];

const DocumentHeader = () => {
  const [name, setName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [companyAddress, setCompanyAddress] = useState('');
  const [fieldOfWork, setFieldOfWork] = useState('');
  const [workDescription, setWorkDescription] = useState('');
  const [revisionDate, setRevisionDate] = useState('');

  const getSuggestions = value => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
    return inputLength === 0 ? [] : fieldOfWorkOptions.filter(option =>
      option.toLowerCase().slice(0, inputLength) === inputValue
    );
  };

  const onSuggestionsFetchRequested = ({ value }) => {
    setSuggestions(getSuggestions(value));
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const [suggestions, setSuggestions] = useState([]);

  const renderSuggestion = (suggestion, { query, isHighlighted }) => (
    <div className={`suggestion ${isHighlighted ? 'suggestion-highlighted' : ''}`}>
      {suggestion}
    </div>
  );

  const inputProps = {
    placeholder: 'Field of Work',
    value: fieldOfWork,
    onChange: (_, { newValue }) => setFieldOfWork(newValue),
    className: 'form-control',
  };

  const handleSubmit = (e) => {
    e.preventDefault();

  };

  return (
    <div className="container-fluid">
      <div className="row justify-content-center mt-5">
        <div className="col-lg-6 col-md-8 col-sm-10">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title text-center mb-4">დოკუმენტის შექმნა</h5>
              <form onSubmit={handleSubmit}>
                <div className="form-group mb-3">
                  <label htmlFor="name" className="mb-1">შემფასებლის/ების სახელი და გვარი::</label>
                  <input type="text" className="form-control" id="name" value={name} onChange={e => setName(e.target.value)} required />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="companyName" className="mb-1">სამუშაო ობიექტის დასახელება და მისამართი:</label>
                  <input type="text" className="form-control" id="companyName" value={companyName} onChange={e => setCompanyName(e.target.value)} required />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="companyAddress" className="mb-1">Company Address:</label>
                  <input type="text" className="form-control" id="companyAddress" value={companyAddress} onChange={e => setCompanyAddress(e.target.value)} required />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="fieldOfWork" className="mb-1">სფერო:</label>
                  <Autosuggest
                    suggestions={suggestions}
                    onSuggestionsFetchRequested={onSuggestionsFetchRequested}
                    onSuggestionsClearRequested={onSuggestionsClearRequested}
                    getSuggestionValue={suggestion => suggestion}
                    renderSuggestion={renderSuggestion}
                    inputProps={inputProps}
                    required
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="workDescription" className="mb-1">სამუშაოს მოკლე აღწერა:</label>
                  <input type="text" className="form-control" id="workDescription" value={workDescription} onChange={e => setWorkDescription(e.target.value)} required />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="revisionDate" className="mb-1">Possible Date of Revision:</label>
                  <input type="date" className="form-control" id="revisionDate" value={revisionDate} onChange={e => setRevisionDate(e.target.value)} required />
                </div>
                <button type="submit" className="btn btn-primary btn-block w-100 mt-4">
                  გაგრძელება
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentHeader;