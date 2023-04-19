const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const { encryptionControllers } = require('./controllers/encryptionController');

//enable CORS for all origins as the frontend and backend are separate
app.use(cors({ origin: '*' }));

//parse incoming JSON and URL-encoded data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//route for encrypting data or decrypting data
app.post('/encrypt', encryptionControllers.encryptData);
app.post('/decrypt', encryptionControllers.decryptData);

// Start the server on port 2873
app.listen(2873, () => {
  console.log('Server started on port 2873');
});
