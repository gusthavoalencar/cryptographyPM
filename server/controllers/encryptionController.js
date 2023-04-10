const { encrypt, decrypt } = require('./encryptionHelper');

const encryptionControllers = {
  encryptData: (req, res) => {
    try {
      const { plaintext, password } = req.body;
      const { ciphertext, iv } = encrypt(plaintext, password);
      return res.json({ ciphertext, iv });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: error.message });
    }
  },
  decryptData: (req, res) => {
    try {
      const { ciphertext, iv, password } = req.body;
      const plaintext = decrypt(ciphertext, iv, password);
      return res.json({ plaintext });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: error.message });
    }
  },
};

module.exports = { encryptionControllers };
