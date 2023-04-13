import React, { useState } from 'react';
import axios from 'axios';
import './index.css';

function Decryption(props) {
  const [plaintext, setPlaintext] = useState('');
  const [password, setPassword] = useState('');
  const [encryptedCode, setEncryptedCode] = useState('');

  const handleSubmitDecypher = async () => {
    // Code to make the API request
    try {
      const response = await axios.post('http://localhost:3000/decrypt', {
        encryptedCode,
        password,
      });
      // Handle the response data
      if (response.status === 200) {
        console.log(response.data);
        setPlaintext(response.data.plaintext);
      }
    } catch (error) {
      // Handle any errors
      console.error(error);
    }
  };

  return (
    <div>
      <h3 className="text-center BlueTxt fw-bold">Decryption</h3>
      <div className="row m-0 ps-5 pe-5">
        <div className="form-group p-0">
          <label htmlFor="exampleFormControlTextarea1">Decrypt code</label>
          <input
            className="form-control"
            id="exampleFormControlTextarea1"
            rows="3"
            placeholder="insert the code to decrypt here"
            value={encryptedCode}
            onChange={(e) => {
              setEncryptedCode(e.target.value);
            }}
          ></input>
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
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
      </div>
      <div className="row m-0">
        <div className="col-12 text-center pt-5">
          <button
            type="button"
            className="btn btn-primary btn-lg"
            onClick={handleSubmitDecypher}
          >
            Submit
          </button>
        </div>
      </div>
      <div className="pt-5 ps-5 pe-5">
        {plaintext !== '' && (
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              Decrypted text
            </span>
            <textarea
              type="text"
              className="form-control"
              value={plaintext}
              readOnly
              rows={5}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default Decryption;
