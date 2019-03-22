import React from 'react';
import {
  MDBBtn,
  MDBCol,
  MDBRow,
} from 'mdbreact';

const AddAddresses = ({transactions, handleTransactionNameChange, handleAddTransaction}) => {
  return (
    <React.Fragment>

    {transactions.map((transaction, idx) => (
        <MDBRow className="my-4" key={`transaction-${idx + 1}`}>
          <MDBCol>
            <label className="sr-only" htmlFor={`transaction-${idx + 1}`}>{`Transaction ID #${idx + 1}`}</label>
            <input
              className="form-control"
              id={`transaction-${idx + 1}`}
              onChange={handleTransactionNameChange(idx)}
              placeholder={`Transaction ID #${idx + 1}`}
              type="text"
              value={transaction.name}
            />
          </MDBCol>
        </MDBRow>
      ))}

      <MDBBtn onClick={handleAddTransaction} color="deep-orange" className="mb-3" type="button">
        Add Transaction ID
      </MDBBtn>
    </React.Fragment>
  );
}

export default AddAddresses;
