const secretKey = require("../configs/auth.config");
const objectConverter = require("../utils/userObjectConverter");
const User = require("../models/user.model");
const CryptoJS = require("crypto-js");
// Encrypt the given value using the secret key
function encryptValue(value) {
  try {
    if (typeof value === "number") {
      // Convert number to string before encryption
      value = value.toString();
    }
    return CryptoJS.AES.encrypt(value, secretKey.secret).toString();
  } catch (err) {
    console.log(err);
  }
}

exports.addUser = async (req, res) => {
  try {
    const encryptedFullName = encryptValue(req.body.fullName);

    const encryptedMobileNumber = encryptValue(req.body.mobileNumber);
    const encryptedEmail = encryptValue(req.body.email);

    const userObj = {
      fullName: encryptedFullName,
      mobileNumber: encryptedMobileNumber,
      address: req.body.address,
      email: encryptedEmail,
    };

    const userCreated = await User.create(userObj);
    if (!userCreated) {
      throw new Error("User creation failed");
    }

    res.status(201).send(objectConverter.userResponse([userCreated]));
  } catch (err) {
    console.log("Some Err happend while addUSer user", err.message);
    res.status(500).send({
      message: "Some Internal server error",
    });
  }
};

// Get all users API with decryption
exports.findUserById = async (req, res) => {
  try {
    const user = await User.find({ _id: req.params.id });
    const decryptedUsers = objectConverter.userResponse(user);
    res.status(200).send(decryptedUsers);
  } catch (err) {
    console.log("Some Err happened while retrieving users", err.message);
    res.status(500).send({
      message: "Some Internal server error",
    });
  }
};

// Get all users API with decryption
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});

    const decryptedUsers = objectConverter.userResponse(users);
    console.log(decryptedUsers);
    res.status(200).send(decryptedUsers);
  } catch (err) {
    console.log("Some Err happened while retrieving users", err.message);
    res.status(500).send({
      message: "Some Internal server error",
    });
  }
};
