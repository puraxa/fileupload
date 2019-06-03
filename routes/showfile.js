var express = require('express');
var router = express.Router();
var upload = require('./uploadfile');
var fs = require('fs');
var lineReader = require('readline');
var csvstring = require('csv-string');
router.get('/',(req,res,next)=>{
    if(!upload.filepath){
        next({status:404, message:'file must be uploaded first'});
    }
    var lineRead = lineReader.createInterface({
        input: fs.createReadStream(upload.filepath,'utf-8')
    });
    var lineCounter = 0;
    var nesto='';
    var parsed;
    lineRead.on('line',line => {
        lineCounter++;
        nesto += line + '\n';
        if(lineCounter > 30){
            lineRead.close();
        }
    });
    lineRead.on('close', () => {
        parsed = csvstring.parse(nesto);
        console.log(parsed);
        res.render('showfile',{result:parsed})
    })
})

module.exports = router;