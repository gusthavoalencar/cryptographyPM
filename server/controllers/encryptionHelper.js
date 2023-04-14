const crypto = require('crypto');
const algorithm = 'aes-256-cbc';

//function for encrypting plaintext with a password
function encrypt(plaintext, password) {
  //generate a 32-byte key from the password using SHA-256 and base64 encoding
  const key = crypto
    .createHash('sha256')
    .update(password)
    .digest('base64')
    .substr(0, 32);
  
  //generate a random 16-byte initialization vector
  const iv = crypto.randomBytes(16);

  //create a cipher object with the chosen algorithm, key, and IV
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  
  //update the cipher with the plaintext data, encoding to hexadecimal
  let ciphertext = cipher.update(plaintext, 'utf8', 'hex');
  ciphertext += cipher.final('hex');

  //return the ciphertext and IV as an object
  return {
    ciphertext: ciphertext,
    iv: iv.toString('hex'),
  };
}

//function for decrypting ciphertext with an IV and password
function decrypt(ciphertext, iv, password) {
  //generate a 32-byte key from the password using SHA-256 and base64 encoding
  const key = crypto
    .createHash('sha256')
    .update(password)
    .digest('base64')
    .substr(0, 32);

  //create a decipher object with the chosen algorithm, key, and IV
  const decipher = crypto.createDecipheriv(
    algorithm,
    key,
    Buffer.from(iv, 'hex')
  );

  //if the ciphertext length is not an even number (invalid hex value) throw an error
  if (ciphertext.length % 2 !== 0) {
    throw new Error('Invalid hex value for ciphertext');
  }

  //update the decipher with the ciphertext data, decoding from hex
  let plaintext = decipher.update(ciphertext, 'hex', 'utf8');
  plaintext += decipher.final('utf8');

  // Return the decrypted plaintext
  return plaintext;
}

// Export the encrypt and decrypt functions to use in other modules
module.exports = { encrypt, decrypt };
