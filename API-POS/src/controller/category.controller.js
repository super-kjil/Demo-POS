const {db,toInt, logError } = require ("../util/helper")


exports.getList = async (req,res) => {
    try {
        const [list] = await db.query("SELECT * FROM category");
    res.json({
        list: list,
    })
    }catch(error){
        logError("category.getList",error,res);
    }
};
exports.create = async (req,res) => {
    try {
        var sql = "INSERT INTO category (Name,Description,Status,ParentId) VALUES (:Name,:Description,:Status,:ParentId)";     
        const [data] = await db.query(sql, {
            Name : req.body.Name,
            Description : req.body.Description,
            Status : req.body.Status,
            ParentId : req.body.ParentId,
         })
        res.json({
            data: data,
        })
    }
    catch(error){
        logError("category.create",error,res);
    }
};
exports.update = async (req,res) => {
    try {
        var sql = "UPDATE category SET Name=:Name, Description=:Description, Status=:Status, ParentId=:ParentId WHERE Id=:Id ";     
        const [data] = await db.query(sql, {
            Id : req.body.Id,
            Name : req.body.Name,
            Description : req.body.Description,
            Status : req.body.Status,
            ParentId : req.body.ParentId,
         })
        res.json({
            data: data,
            message : "Data Update Success!"
        })
    }
    catch(error){
        logError("category.update",error,res);
    }
};
exports.remove = async (req,res) => {
    try {
        var sql = "DELETE FROM category WHERE Id =:Id";     
        const [data] = await db.query(sql, {
            Id : req.body.Id,
         })
        res.json({
            data: data,
            message : "Data Delete Success!"
        })
    }
    catch(error){
        logError("category.remove",error,res);
    }
};