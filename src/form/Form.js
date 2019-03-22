import React from 'react';
import axios from 'axios';
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBContainer,
  MDBRow,
} from 'mdbreact';
import AddAddresses from './AddAddresses';
import ExcludeTx from './ExcludeTx';
import Report from '../report/Report';

class FormPage extends React.Component {
  constructor() {
    super();
    this.state = {
      addresses: [{ addressName: '' }],
      addressName: '',
      loading: false,
      results: {},
      transactionName: '',
      transactions: [{ transactionName: '' }],
    };
  }

  handleAddressNameChange = (idx) => (e) => {

    const newAddresses = this.state.addresses.map((addressName, sidx) => {
      if (idx !== sidx) return addressName;
      return { ...addressName, addressName: e.target.value };
    });

    this.setState({ addresses: newAddresses });
  }

  handleTransactionNameChange = (idx) => (e) => {
    const newTransactions = this.state.transactions.map((transactionName, sidx) => {
      if (idx !== sidx) return transactionName;
      return { ...transactionName, transactionName: e.target.value };
    });

    this.setState({ transactions: newTransactions });
  }

  handleAddAddress = () => {
    this.setState({
      addresses: this.state.addresses.concat([{ addressName: '' }])
    });
  }

  handleAddTransaction = () => {
    this.setState({
      transactions: this.state.transactions.concat([{ transactionName: '' }])
    });
  }

  handleReset = () => {
    this.setState({
      error: '',
      loading: false,
      results: {},
    });
  }

  resetButton = () => <MDBBtn key="resetButton" onClick={this.handleReset} color="deep-orange" className="mb-3" type="button">
    Reset and Start Over
  </MDBBtn>

  handleSubmit = (e) => {
    e.preventDefault();
    const apiAddress = process.env.REACT_APP_API_ADDRESS || '';
    const { addresses, transactions } = this.state;
    const networkCode = process.env.REACT_APP_NETWORK || 'ark';


    this.setState({
      loading: true,
    });

    axios.post(`${apiAddress}/api`, {
      addresses: addresses.map((address) => address.addressName).filter((address) => address !== ''),
      exceptions: transactions.map((transaction) => transaction.transactionName).filter((transaction) => transaction !== ''),
      network: networkCode,
    }).then((response) => {
      this.setState({
        error: '',
        loading: false,
        results: response.data,
      });
    }).catch((error) => {
      this.setState({
        error: 'Oh noes! There was an issue with your request. Please check your data and try again.',
        loading: false,
        results: {},
      });

    });
  }

  render() {
    return (
      <MDBContainer className="my-4">
      {
        Object.keys(this.state.results).length > 0 ?
          <Report resetButton={this.resetButton} results={this.state.results} /> :
          <form onSubmit={this.handleSubmit} aria-describedby="form-error">
            <MDBRow>
              <MDBCol md="6" className="my-4">
                <h2>Add Public Keys</h2>
                <MDBCard>
                  <MDBCardBody>
                    {
                      <AddAddresses addresses={this.state.addresses} handleAddressNameChange={this.handleAddressNameChange} handleAddAddress={this.handleAddAddress} />
                    }
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>

              <MDBCol md="6" className="my-4">
                <h2>Exclude Transactions by ID</h2>
                <MDBCard>
                  <MDBCardBody>
                    {
                      <ExcludeTx transactions={this.state.transactions} handleTransactionNameChange={this.handleTransactionNameChange} handleAddTransaction={this.handleAddTransaction} />
                    }
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            </MDBRow>

            {
              this.state.loading ? <p>loading...</p> : <MDBBtn color="blue" className="my-4" type="submit">Submit</MDBBtn>
            }

            {
              this.state.error && <p className="error" id="form-error"><strong>{this.state.error}</strong></p>
            }

          </form>
      }
      </MDBContainer>
    );
  }
};

export default FormPage;
