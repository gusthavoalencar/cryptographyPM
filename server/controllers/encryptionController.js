//import the encrypt and decrypt functions from the 'encryptionHelper' module
const { encrypt, decrypt } = require('./encryptionHelper');

//define the encryption controllers
const encryptionControllers = {
  //method for encrypting data from the request body
  encryptData: (req, res) => {
    try {
      const { plaintext, password } = req.body;
      //call the encrypt function with the plaintext and password, and obtain the ciphertext and IV
      const { ciphertext, iv } = encrypt(plaintext, password);
      //joined the ciphertext and IV with a - and send as response, 
      //this is so it can mask what type of encryptions its used!!
      const encryptedCode = `${ciphertext}-${iv}`;
      return res.json({ encryptedCode });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: error.message });
    }
  },
  //method for decrypting data from the request body
  decryptData: (req, res) => {
    try {
      const { encryptedCode, password } = req.body;
      //split the encrypted code into ciphertext and IV using the separator
      const [ciphertext, iv] = encryptedCode.split('-');
      //call the decrypt function with the ciphertext, IV, and password to get the plaintext
      const plaintext = decrypt(ciphertext, iv, password);
      //send the plaintext as response
      return res.json({ plaintext });
      //handle other erros
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: error.message });
    }
  },
};

//export the encryption controllers for use in other modules
module.exports = { encryptionControllers };
