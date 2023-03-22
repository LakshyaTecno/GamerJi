const userController = require("../controllers/user.controller");

const {
  isValidUserIdInRequestParam,
  validateAddUserRequestBody,
} = require("../middlewares/verifyUserRequestBodies");
module.exports = (app) => {
  app.get("/gamerji/api/v1/users", userController.getAllUsers);
  app.post(
    "/gamerji/api/v1/users",
    [validateAddUserRequestBody],
    userController.addUser
  );
  app.get(
    "/gamerji/api/v1/users/:id",
    [isValidUserIdInRequestParam],
    userController.findUserById
  );
};
