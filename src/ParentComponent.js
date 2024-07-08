import React, { useState } from 'react';
import CustomerDetailsTable from './CustomerDetailsTable';
import ManufactureDetailsTable from './ManufactureDetailsTable';

const ParentComponent = () => {
  const [totalKgByCustomer, setTotalKgByCustomer] = useState({});

  const handleTotalKgCalculated = (totals) => {
    setTotalKgByCustomer(totals);
  };

  return (
    <>
      <ManufactureDetailsTable onTotalKgCalculated={handleTotalKgCalculated} />
      <CustomerDetailsTable totalKgByCustomer={totalKgByCustomer} />
    </>
  );
};

export default ParentComponent;
