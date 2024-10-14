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
        const [list] = await db.query("INSERT INTO category");
    res.json({
        list: list,
    })
    }catch(error){
        logError("category.create",error,res);
    }
};
exports.update = (req,res) => {
    res.json({
        list: [3],
    })
};
exports.remove = (req,res) => {
    res.json({
        list: [4],
    })
};