import React from 'react';
import Form from './form/Form';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
} from 'mdbreact';


import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';

// Any custom styles go here.
import './App.css';

class App extends React.Component {
  render() {
    return (
      <div className="App my-4">
        <MDBContainer>
          <h1 className="my-3">
            Ark Income Estimator
          </h1>
          <MDBRow>
            <MDBCol>
              <Form />
            </MDBCol>
          </MDBRow>

          <footer>
            <p>* Tool does not constitute formal tax advice.</p>
            <p>&copy; 2018 Goose and ArkMoon</p>
          </footer>

        </MDBContainer>
      </div>
    );
  }
}

export default App;
