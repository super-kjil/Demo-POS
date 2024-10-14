const mysql2 = require("mysql2/promise")
const {config} = require("./config")

module.exports = mysql2.createPool ({
    host:config.db.HOST,
    user:config.db.USER,
    password:config.db.PASSWORD,
    database:config.db.DATABASE,
    port:config.db.PORT,
    namedPlaceholders: true,
})