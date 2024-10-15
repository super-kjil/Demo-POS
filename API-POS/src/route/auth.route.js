const {
    getList,
    register,
    login,
    profile,
    validate_token,
  } = require ("../controller/auth.controller");
  
  module.exports = (app) => {
    app.get("/api/auth/getList",validate_token(),  getList);
    app.post("/api/auth/register",validate_token(), register);
    app.post("/api/auth/login",validate_token(), login);
    app.post("/api/auth/profile",validate_token(), profile);
  };