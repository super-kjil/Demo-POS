const { validate_token } = require("../controller/auth.controller");
const {
    getList,
    create,
    update,
    remove
    } = require ("../controller/role.controller")
    // ,validate_token()
module.exports = (app) => {
    app.get("/api/role",getList);
    app.post("/api/role",create);
    app.put("/api/role",update);
    app.delete("/api/role",remove);
};