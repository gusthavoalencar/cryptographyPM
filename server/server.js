const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { encryptionControllers } = require('./controllers/encryptionController');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/encrypt', encryptionControllers.encryptData);

app.post('/decrypt', encryptionControllers.decryptData);

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
