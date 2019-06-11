var express = require('express');
var router = express.Router();
var mysql = require('../public/javascript/database');
var util = require('util');
var bcrypt = require('bcrypt');
var query = util.promisify(mysql.query).bind(mysql);
const checkReqBody = util.promisify((body,callback) =>{
    if(!body.email || !body.fullname || !body.username || !body.password){
        callback({status:400, message: 'All fields are required!'});
    }
    callback(null,'Body is OK!');
});

const checkDatabase = async(email,username) =>{
    try{
        let emailSearch = await query(`SELECT * FROM users WHERE email='${email}'`);
        if(emailSearch.length>0){
            throw new Error('email already in use');
        }
        let usernameSearch = await query(`SELECT * FROM users WHERE username='${username}'`);
        if(usernameSearch.length>0){
            throw new Error('Username already in use');
        }
        return true;
    } catch(err){
        throw err;
    }
};

const addUser = async(body) =>{
    try{
        let hash = await bcrypt.hash(body.password,8);
        console.log(hash);
        await query(`INSERT INTO users(fullname,email,username,password) VALUES ('${body.fullname}','${body.email}','${body.username}','${hash}')`); 
    } catch(err) {
        throw err;
    }
}

router.get('/',async(req,res,next)=>{
    res.render('register');
});

router.post('/', async(req,res,next)=>{
    try{
        let bodyCheck = await checkReqBody(req.body);
        console.log(bodyCheck);
        await checkDatabase(req.body.email,req.body.username);
        await addUser(req.body);
        res.redirect('/');
    } catch(err){
        next(err);
    }
});

module.exports = router;