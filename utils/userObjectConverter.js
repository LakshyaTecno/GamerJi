const CryptoJS = require("crypto-js");

exports.userResponse = (users) => {
  let userResult = [];
  let secretKey = require("../configs/auth.config");
  function decryptValue(value) {
    const bytes = CryptoJS.AES.decrypt(value, secretKey.secret);
    const decryptedValue = bytes.toString(CryptoJS.enc.Utf8);
    console.log(decryptedValue);
    return decryptedValue;
  }

  users.forEach((user) => {
    const decryptedFullName = decryptValue(user.fullName);
    console.log(decryptedFullName);

    const decryptedMobileNumber = decryptValue(user.mobileNumber);

    const decryptedEmail = decryptValue(user.email);

    userResult.push({
      id: user._id,
      fullName: decryptedFullName,
      mobileNumber: decryptedMobileNumber,
      address: user.address,
      email: decryptedEmail,
    });
    // userResult.push({
    //   id: user._id,
    //   fullName: user.fullName,
    //   mobileNumber: user.mobileNumber,
    //   address: user.address,
    //   email: user.email,
    // });
  });
  return userResult;
};
