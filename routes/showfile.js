var express = require('express');
var router = express.Router();
var upload = require('./uploadfile');
var fs = require('fs');
var lineReader = require('readline');
var csvstring = require('csv-string');
router.get('/',(req,res,next)=>{
    if(!req.cookies.token){
        res.render('notLogged');
    }
    else
    {    if(!upload.filepath){
            next({status:404, message:'file must be uploaded first'});
        }
        var currentPage = parseInt(req.query.page);
        var lineRead = lineReader.createInterface({
            input: fs.createReadStream(upload.filepath,'utf-8')
        });
        var lineCounter = 0;
        var nesto='';
        var parsed;
        lineRead.on('line',line => {
            lineCounter++;
            if(lineCounter==1){
                nesto+= line+ '\n';
            }
            if(lineCounter<currentPage*30+2 && lineCounter>=(currentPage-1)*30+2){
                nesto += line + '\n';
            }
        });
        var pages = Math.round((lineCounter-1)/30);
        console.log(pages);
        lineRead.on('close', () => {
            parsed = csvstring.parse(nesto);
            console.log(parsed);
            res.render('showfile',{result:parsed, pages: Math.round((lineCounter-1)/30)+1,currentPage:currentPage})
        })
    }
})

module.exports = router;