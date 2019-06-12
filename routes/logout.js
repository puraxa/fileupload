var express = require('express');
var router = express.Router();

router.get('/',(req,res,next)=>{
    res.cookie('token','',{expires: new Date(0)});
    res.redirect(req.path);
})

module.exports = router;