const { encrypt, decrypt } = require('./encryptionHelper');

const encryptionControllers = {
  encryptData: (req, res) => {
    try {
      const { plaintext, password } = req.body;
      const { ciphertext, iv } = encrypt(plaintext, password);
      const encryptedCode = `${ciphertext}-${iv}`;
      return res.json({ encryptedCode });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: error.message });
    }
  },
  decryptData: (req, res) => {
    try {
      const { encryptedCode, password } = req.body;

      const [ciphertext, iv] = encryptedCode.split('-');
      console.log(ciphertext);
      console.log(iv);
      const plaintext = decrypt(ciphertext, iv, password);
      return res.json({ plaintext });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: error.message });
    }
  },
};

module.exports = { encryptionControllers };
