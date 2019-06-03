var express = require('express');
var router = express.Router();

router.post('/',(req,res,next)=>{
    router.filepath = req.file.path;
    res.redirect('/showfile');
})

module.exports = router;