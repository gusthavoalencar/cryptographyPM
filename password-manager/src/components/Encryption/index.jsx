import React, { useState } from 'react';
import axios from 'axios';

function Encryption(props) {
  const [plaintext, setPlaintext] = useState('');
  const [password, setPassword] = useState('');
  const [encryptResult, setEncryptResult] = useState('');

  const handleSubmitCypher = async () => {
    // Code to make the API request
    try {
      const response = await axios.post('http://localhost:3000/encrypt', {
        plaintext,
        password,
      });
      // Handle the response data
      if (response.status === 200) {
        console.log(response.data);
        setEncryptResult(response.data.encryptedCode);
      }
    } catch (error) {
      // Handle any errors
      console.error(error);
    }
  };

  return (
    <div>
      <h3 className="text-center BlueTxt fw-bold">Encryption</h3>
      <div className="row m-0 ps-5 pe-5">
        <div className="form-group p-0">
          <label htmlFor="exampleFormControlTextarea1">Text to encrypt</label>
          <textarea
            className="form-control"
            id="exampleFormControlTextarea1"
            rows="3"
            placeholder="insert text here"
            value={plaintext}
            onChange={(e) => setPlaintext(e.target.value)}
          ></textarea>
        </div>
      </div>
      <div className="row m-0 ps-5 pe-5 pt-4">
        <label htmlFor="inputPassword" className="col-2 col-form-label">
          Password:
        </label>
        <div className="col-10 p-0">
          <input
            type="password"
            className="form-control"
            id="inputPassword"
            placeholder="insert password here"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>
      <div className="row m-0">
        <div className="col-12 text-center pt-5">
          <button
            type="button"
            className="btn btn-primary btn-lg"
            onClick={handleSubmitCypher}
          >
            Submit
          </button>
        </div>
      </div>
      <div className="pt-5 ps-5 pe-5">
        {encryptResult !== '' && (
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              Encrypted Code
            </span>
            <input
              type="text"
              className="form-control"
              value={encryptResult}
              readOnly
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default Encryption;
