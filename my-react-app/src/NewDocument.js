// NewDocument.js
import React, { useState } from "react";
import ProfileHeader from './ProfileHeader';
import DocumentHeader from "./DocumentHeader";
import DangersDocument from "./DangersDocument";
import DangersTableOne from "./DangersTableOne";
import DangersTableTwo from "./DangersTableTwo";

export function NewDocument() {
  const [name, setName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [companyAddress, setCompanyAddress] = useState('');
  const [fieldOfWork, setFieldOfWork] = useState('');
  const [workDescription, setWorkDescription] = useState('');
  const [revisionDate, setRevisionDate] = useState('');
  const [selectedDanger, setSelectedDanger] = useState(null);
  const [existingMechanisms, setExistingMechanisms] = useState([]);
  const [additionalMechanisms, setAdditionalMechanisms] = useState([]);

  const handleContinue = () => {
    setSelectedDanger(null);
    setExistingMechanisms([]);
    setAdditionalMechanisms([]);
  };

  const handleDangerSelect = (danger) => {
    setSelectedDanger(danger);
  };

  const handleBack = () => {
    setSelectedDanger(null);
  };

  const handleMechanismSelection = (mechanism, option) => {
    if (option === 'yes') {
      setExistingMechanisms((prevMechanisms) => [...prevMechanisms, mechanism]);
      setAdditionalMechanisms((prevMechanisms) =>
        prevMechanisms.filter((m) => m.id !== mechanism.id)
      );
    } else if (option === 'no') {
      setAdditionalMechanisms((prevMechanisms) => [...prevMechanisms, mechanism]);
      setExistingMechanisms((prevMechanisms) =>
        prevMechanisms.filter((m) => m.id !== mechanism.id)
      );
    } else if (option === 'not-required') {
      setExistingMechanisms((prevMechanisms) =>
        prevMechanisms.filter((m) => m.id !== mechanism.id)
      );
      setAdditionalMechanisms((prevMechanisms) =>
        prevMechanisms.filter((m) => m.id !== mechanism.id)
      );
    }
  };

  const handleRemoveMechanism = (mechanismId) => {
    setExistingMechanisms((prevMechanisms) =>
      prevMechanisms.filter((m) => m.id !== mechanismId)
    );
    setAdditionalMechanisms((prevMechanisms) =>
      prevMechanisms.filter((m) => m.id !== mechanismId)
    );
  };

  return (
    <div>
      <ProfileHeader />
      {!selectedDanger ? (
        <DocumentHeader
          name={name}
          setName={setName}
          companyName={companyName}
          setCompanyName={setCompanyName}
          companyAddress={companyAddress}
          setCompanyAddress={setCompanyAddress}
          fieldOfWork={fieldOfWork}
          setFieldOfWork={setFieldOfWork}
          workDescription={workDescription}
          setWorkDescription={setWorkDescription}
          revisionDate={revisionDate}
          setRevisionDate={setRevisionDate}
          onContinue={() => setSelectedDanger({})}
        />
      ) : !existingMechanisms.length && !additionalMechanisms.length ? (
        <DangersTableOne
          danger={selectedDanger}
          onContinue={() => setSelectedDanger({ ...selectedDanger, tableOne: true })}
          onBack={handleBack}
        />
      ) : (
        <DangersTableTwo
          danger={selectedDanger}
          existingMechanisms={existingMechanisms}
          additionalMechanisms={additionalMechanisms}
          onMechanismSelection={handleMechanismSelection}
          onRemoveMechanism={handleRemoveMechanism}
          onContinue={handleContinue}
          onBack={() => setSelectedDanger({ ...selectedDanger, tableOne: true })}
        />
      )}
      {selectedDanger && selectedDanger.tableOne && (
        <DangersDocument
          name={name}
          fieldOfWork={fieldOfWork}
          onDangerSelect={handleDangerSelect}
          onBack={() => setSelectedDanger(null)}
        />
      )}
    </div>
  );
}