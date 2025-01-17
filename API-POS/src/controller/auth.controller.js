const { logError, db } = require("../util/helper");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../util/config");

exports.getList = async (req,res) => {
    try {
      let sql =
      " SELECT  " +
      " u.id, " +
      " u.name, " +
      " u.username, " +
      " u.create_by, " +
      " u.is_active, " +
      " r.name AS role_name " +
      " FROM user u " +
      " INNER JOIN role r ON u.role_id = r.id ";
    const [list] = await db.query(sql);
    const [role] = await db.query(
      "SELECT id as value, name as label FROM role"
    );
    res.json({
      list,
      role,
    });
    } catch (error) {
        logError("auth.getList",error ,res);
    } 
};

exports.register = async (req,res) => {
     
    try {
        // hash password
        let password = req.body.password;
        password = bcrypt.hashSync(password, 10); // 123456, "314098spofaspdofjpo2rlsjlfasdf"
        let sql =
          "INSERT INTO " +
          " user ( role_id, name, username, password, is_active, create_by) VALUES " +
          " (:role_id,:name,:username,:password,:is_active,:create_by); ";
        let data = await db.query(sql, {
          id: req.body.id,
          role_id: req.body.role_id,
          name: req.body.name,
          username: req.body.username,
          password: password,
          is_active: req.body.is_active,
          create_by: req.profile?.name, // current user that action this module
        });
        res.json({
          message: "Create new account success!",
          data: data,
        });
      } catch (error) {
        logError("auth.register", error, res);
      }
};
 

exports.login = async (req,res) => {
  let { password, username } = req.body;
    try {
      let sql =
      "SELECT " +
      " u.*," +
      " r.name as role_name" +
      " FROM user u " +
      " INNER JOIN role r ON u.role_id = r.id " +
      " WHERE u.username=:username ";
        let [data] = await db.query(sql, {
          username:username,
        })
        if (data.length == 0) {
          res.json({
            error : {
              username: "Username doesn't exist"
            }
          })
        }
        else {
          let dbPass = data[0].password;
      let isCorrectPass = bcrypt.compareSync(password, dbPass); // true | false
      if (!isCorrectPass) {
        res.json({
          error: {
            password: "Password incorrect!",
          },
            })
          }
          else { 
          delete  data[0].password;
          let obj = {
            profile : data[0],
            permision : ["Read", "Wite"]
          }
           res.json ({
            message : "Login Success",
            ...obj,
            access_token : await getAccessToken(obj),
           })
          }
        }   
       
    } catch (error) {
        logError("auth.login",error ,res);
    } 
};

exports.profile = async (req,res) => {
    try {
      res.json({
        profile : req.profile,
        permision : req.permision,
        current_id : req.current_id
      }) 
        res.json({
          profile : req.profile,
        })
    } catch (error) {
        logError("auth.profile",error ,res);
    } 
};

exports.update = async (req,res) => {
  try {
    //role_id name username password is_active 
      var sql = "UPDATE user SET role_id:=role_id,name:=name,username:=username,password:=password,is_active:=is_active, WHERE Id=:Id ";     
      const [data] = await db.query(sql, {
        role_id : req.body.role_id,
        name : req.body.name,
        username : req.body.username,
        password : req.body.password,
        is_active : req.body.is_active,
       })
      res.json({
          data: data,
          message : "Data Update Success!"
      })
  }
  catch(error){
      logError("user.update",error,res);
  }
};

exports.remove = async (req,res) => {
  try {
      var sql = "DELETE FROM user WHERE id = :id";     
      const [data] = await db.query(sql, {
          id : req.body.id,
       })
      res.json({
          data: data,
          message : "Data Delete Success!"
      })
  }
  catch(error){
      logError("user.remove",error,res);
  }
};

exports.validate_token = () => {
    // call in midleware in route (role route, user route, teacher route)
  return (req, res, next) => {
    var authorization = req.headers.authorization; // token from client
    var token_from_client = null;
    if (authorization != null && authorization != "") {
      token_from_client = authorization.split(" "); // authorization : "Bearer lkjsljrl;kjsiejr;lqjl;ksjdfakljs;ljl;r"
      token_from_client = token_from_client[1]; // get only access_token
    }
    if (token_from_client == null) {
      res.status(401).send({
        message: "Unauthorized",
      });
    } else {
      
      jwt.verify(        
         token_from_client,
         config.config.token.access_token_key,
        // config.config.token.access_token_key,
        (error, result) => {
          if (error) {
            res.status(401).send({ 
              message: "Unauthorized",
              error: error,
            });
          } else { 
            req.current_id = result.data.profile.id;
            req.profile = result.data.profile; // write user property
            req.permision = result.data.permision; // write user property
            next(); // continue controller
          }
        }
      );
    }
  };
};

const getAccessToken = async (paramData) => {
    
  const access_token = await jwt.sign(
    {data:paramData},
    config.config.token.access_token_key,
    {expiresIn:"1d"})
  return access_token;


  // const acess_token = await jwt.sign(
  //   { data: paramData },
  //   config.config.token.access_token_key
  //   // {
  //   //   expiresIn: "1d",
  //   // }
  // );
  // return acess_token;
};