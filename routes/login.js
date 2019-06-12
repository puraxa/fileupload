var express = require('express');
var router = express.Router();
var mysql = require('../public/javascript/database');
var util = require('util');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

var query = util.promisify(mysql.query).bind(mysql);

const checkBody = util.promisify((body,callback) => {
    if(!body.email || !body.password){
        callback({status:400,message:'Invalid request!'});
    }
    callback(null,'Body OK!');
});

const getUser = async(body) =>{
    try {
        const emailSearch = await query(`SELECT * FROM users WHERE email='${body.email}'`);
        let usernameSearch;
        if(emailSearch.length == 0){
            usernameSearch = await query(`SELECT * FROM users WHERE username='${body.email}'`)
            if(usernameSearch.length == 0){
                throw new Error('user not found');
            }
            return usernameSearch;
        }
        return emailSearch;
    } catch(err) {
        throw err;
    }
}

const verifyPw = async(inputPw, dbPw) => {
    try{
        const checkPw = await bcrypt.compare(inputPw,dbPw);
        if(!checkPw){
            throw {status:400, message:'Invalid pw'};
        }
        return checkPw;
    } catch(err){
        throw err;
    }
}

router.get('/',(req,res,next)=>{
    jwt.verify(req.cookies.token,'$!GMOPHE_#T@M#MH#_T',function(err,decoded){
        if(err){
            console.log(err);
            res.render('login');
        }else{
            console.log(decoded);
            res.redirect('/');
        }
    })
});

router.post('/',async(req,res,next)=>{
    try{
        await checkBody(req.body);
        const user = await getUser(req.body);
        console.log(user);
        const checkPw = await verifyPw(req.body.password,user[0].password);
        console.log(checkPw);
        let token = jwt.sign({id: user[0].userID, fullname: user[0].fullname,username: user[0].username, email: user[0].email},'$!GMOPHE_#T@M#MH#_T');
        //res.send(JSON.stringify({token: token}));
        res.cookie('token',token);
        res.redirect('/');
        // const emailSearch = await query(`SELECT * FROM users WHERE email='${req.body.email}'`);
        // const usernameSearch;
        // if(emailSearch.length == 0){
        //     usernameSearch = await query(`SELECT * FROM users WHERE username='${req.body.email}'`)
        // }
    }catch(err) {
        next(err);
    }
})

module.exports = router;