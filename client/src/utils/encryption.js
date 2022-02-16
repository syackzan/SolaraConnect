'use strict'

const encryptIt = (pubKey) => {
    const cipherText = CryptoJS.AES.encrypt(pubKey, secret).toString();
    return cipherText
}
const decryptIt = (encryption) => {
    const byes = CryptoJS.AES.decrypt(encryption, secret);
    const pubKey = bytes;
}