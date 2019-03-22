import React from 'react';
import {
  MDBBtn,
  MDBCol,
  MDBRow,
} from 'mdbreact';

const AddAddresses = ({addresses, handleAddressNameChange, handleAddAddress}) => {
  return (
    <React.Fragment>

    {addresses.map((address, idx) => (
        <MDBRow className="my-4" key={`address-${idx + 1}`}>
          <MDBCol>
            <label className="sr-only" htmlFor={`address-${idx + 1}`}>{`Public Key #${idx + 1}`}</label>
            <input
              className="form-control"
              id={`address-${idx + 1}`}
              onChange={handleAddressNameChange(idx)}
              placeholder={`Public Key #${idx + 1}`}
              type="text"
              value={address.name}
            />
          </MDBCol>
        </MDBRow>
      ))}

      <MDBBtn onClick={handleAddAddress} color="deep-orange" className="mb-3" type="button">
        Add Address
      </MDBBtn>
    </React.Fragment>
  );
}

export default AddAddresses;
