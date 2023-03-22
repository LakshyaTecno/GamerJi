const User = require("../models/user.model");

const isValidEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

const validateAddUserRequestBody = async (req, res, next) => {
  if (!req.body.fullName) {
    return res.status(400).send({
      message: "Failed fullName is not provided",
    });
  }

  if (!req.body.mobileNumber) {
    return res.status(400).send({
      message: "Failed mobileNumber is not provided",
    });
  } else if (req.body.mobileNumber.length != 10) {
    return res.status(400).send({
      message: "Failed Not a valid mobileNumber ",
    });
  }
  if (!req.body.address) {
    return res.status(400).send({
      message: "Failed address is not provided",
    });
  }

  if (!req.body.email) {
    return res.status(400).send({
      message: "Failed email is not provided",
    });
  }

  if (!isValidEmail(req.body.email)) {
    return res.status(400).send({
      message: "Failed Not a valid email Id ",
    });
  } else {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).send({
          message: "Failed EmailId is already taken",
        });
      }
    } catch (err) {
      console.log("Some Err happend", err.message);
      res.status(500).send({
        message: "Some Internal server error",
      });
    }
  }

  next();
};
const isValidUserIdInRequestParam = async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.params.id });

    if (!user) {
      return res.status(400).send({
        message: "UserId passed doesn't exist",
      });
    }
    next();
  } catch (err) {
    console.log("Error while reading the user info", err.message);
    return res.status(500).send({
      message: "Some Internal server error",
    });
  }
};

const userRequestBodies = {
  isValidUserIdInRequestParam: isValidUserIdInRequestParam,
  validateAddUserRequestBody: validateAddUserRequestBody,
};

module.exports = userRequestBodies;
