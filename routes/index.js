var express = require('express');
var router = express.Router();
var checkToken = require('../public/javascript/checkToken');
/* GET home page. */
router.get('/', async function(req, res, next) {
  try{
    if(!req.cookies.token){
      res.render('notLogged');
    }
    else{    
      let nesto = await checkToken(req.cookies.token);
      console.log(nesto);
      console.log(req.cookies.token);
      res.render('index',{logged: true});
    }
  }catch(err){
    next(err);
  }
});

module.exports = router;
