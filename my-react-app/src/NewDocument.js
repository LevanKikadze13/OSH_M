import React, { useState } from "react";
import ProfileHeader from './ProfileHeader';
import DocumentHeader from "./DocumentHeader";
import DangersDocument from "./DangersDocument";

export function NewDocument() {
  const [name, setName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [companyAddress, setCompanyAddress] = useState('');
  const [fieldOfWork, setFieldOfWork] = useState('');
  const [workDescription, setWorkDescription] = useState('');
  const [revisionDate, setRevisionDate] = useState('');
  const [showDangersDocument, setShowDangersDocument] = useState(false);

  const handleContinue = () => {
    setShowDangersDocument(true);
  };

  const handleBack = () => {
    setShowDangersDocument(false);
  };

  return (
    <div>
      <ProfileHeader />
      {!showDangersDocument ? (
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
          onContinue={handleContinue}
        />
      ) : (
        <DangersDocument
          name={name}
          fieldOfWork={fieldOfWork}
          onBack={handleBack}
        />
      )}
    </div>
  );
}