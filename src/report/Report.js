import React from 'react';
import { MDBAlert, MDBBtn } from 'mdbreact';
import DatatablePage from './DatatablePage';
import { fileOutput } from './FileOutput';

const failureMessage = <MDBAlert color="danger" >
  No results found.
</MDBAlert>;

const dataTable = (title, data) => {
  const columns = data.columns.map((column) => {
    return ({
      label: column,
      field: column,
      sort: 'asc',
    });
  });

  const rows = data.data.map((row) => {
    let result = {};

    // Grab the headers for keys.
    for(let i = 0, len = data.columns.length; i < len; i++) {
      result[data.columns[i]] = row[i];
    }

    return result;
  });

  return (
    <React.Fragment key={title}>
      <h2>{title}</h2>
      {
        DatatablePage(columns, rows)
      }
      {
        <MDBBtn onClick={fileOutput(title, columns, rows)} color="deep-orange" className="mb-3" type="button">
          Download {title} CSV
        </MDBBtn>
      }
      <hr />
    </React.Fragment>
  );
}

const Report = (props) => {
  let tables = [];

  const keys = Object.keys(props.results);
  for (const key of keys) {
    tables.push(dataTable(key, props.results[key]));
  }

  if (tables.length > 0) {
    // Add reset button and disclaimer.
    tables.unshift(<p key="disclaimer"><sup>*</sup>Market Values based on End of Day CryptoCompare prices</p>);
    tables.unshift(props.resetButton());
    return tables;
  } else {
    return failureMessage;
  }
}

export default Report;
