const {
    getList,
    register,
    login,
    profile,
    remove,
    update,
    validate_token,
  } = require ("../controller/auth.controller");
  // validate_token(), 
  module.exports = (app) => {
    app.get("/api/auth/getlist",validate_token(), getList);
    app.post("/api/auth/register",validate_token(), register);
    app.post("/api/auth/login", login);
    app.post("/api/auth/profile",validate_token(), profile);
    app.put("/api/auth/update-profile",validate_token(), update);
    app.delete("/api/auth/user-profile",validate_token(), remove);
  };