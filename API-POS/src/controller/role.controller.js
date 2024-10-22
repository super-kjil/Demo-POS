const {db,toInt, logError } = require ("../util/helper")


exports.getList = async (req,res) => {
    
    try {
        var sql = 
        "SELECT " +  
        "r.id, " +   // Notice the space after the comma
        "r.name, " +
        "r.code, " +
        "u.is_active AS role_is_active " +  // Space after "AS role_is_active"
        "FROM role r " +   // Space before "FROM"
        "INNER JOIN user u ON u.role_id = r.id";  // Space before "INNER JOIN"
        const [list] = await db.query(sql);
    res.json({
        i_know_you_are_id: req.current_id,
        list: list,
    })
    }catch(error){
        logError("role.getList",error,res);
    }
};
exports.create = async (req,res) => {
    try {
        var sql = "INSERT INTO role (name,code) VALUES (:name,:code)";     
        const [data] = await db.query(sql, {
            name : req.body.name,
            code : req.body.code,
         })
        res.json({
            data: data,            
            message : "Insert Success!",
        })
        console.log(res)
    }
    catch(error){
        logError("role.create",error,res);
    }
};
exports.update = async (req,res) => {
    try {
        var sql = "UPDATE role SET name=:name, code=:code WHERE id = :id";     
        const [data] = await db.query(sql, {
            id: req.body.id,
            name: req.body.name,
            code: req.body.code, // null
         })
        res.json({
            data: data,
            message : "Data Update Success!"
        })
    }
    catch(error){
        logError("role.update",error,res);
    }
};
exports.remove = async (req,res) => {
    try {
        var sql = "DELETE FROM role WHERE id = :id";     
        const [data] = await db.query(sql, {
            Id : req.body.Id,
         })
        res.json({
            data: data,
            message : "Data Delete Success!"
        })
    }
    catch(error){
        logError("role.remove",error,res);
    }
};