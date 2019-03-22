import React from 'react';
import { MDBDataTable } from 'mdbreact';

const DatatablePage = (columns, rows) => {
  const data = {
    columns,
    rows,
  };

  return (
    <MDBDataTable
      bordered
      data={data}
      searching={false}
      small
      striped
    />
  );
}

export default DatatablePage;
