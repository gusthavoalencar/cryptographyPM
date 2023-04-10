const crypto = require('crypto');
const algorithm = 'aes-256-cbc';

function encrypt(plaintext, password) {
  const key = crypto
    .createHash('sha256')
    .update(password)
    .digest('base64')
    .substr(0, 32);
  const iv = crypto.randomBytes(16);

  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let ciphertext = cipher.update(plaintext, 'utf8', 'hex');
  ciphertext += cipher.final('hex');

  return {
    ciphertext: ciphertext,
    iv: iv.toString('hex'),
  };
}

function decrypt(ciphertext, iv, password) {
  const key = crypto
    .createHash('sha256')
    .update(password)
    .digest('base64')
    .substr(0, 32);

  const decipher = crypto.createDecipheriv(
    algorithm,
    key,
    Buffer.from(iv, 'hex')
  );

  if (ciphertext.length % 2 !== 0) {
    throw new Error('Invalid hex value for ciphertext');
  }

  let plaintext = decipher.update(ciphertext, 'hex', 'utf8');
  plaintext += decipher.final('utf8');

  return plaintext;
}

module.exports = { encrypt, decrypt };
