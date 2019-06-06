var express = require('express');
var router = express.Router();
var fs = require('fs');
var util = require('util');

let generateRow = () => {
    let row = '';
    let temp = [];
    temp.push(Math.round((Math.random()*600)+100));
    temp.push(Math.round((Math.random()*700)+90));
    temp.push(Math.round((Math.random()*50)+1));
    temp.push(Math.round((Math.random()*12)+1));
    temp.push(Math.round((Math.random()*5)+2));
    temp.push(Math.round((Math.random()*5)+0));
    temp.push(Math.round((Math.random()*60)+1));
    temp.push(Math.round((Math.random()*3)+0).toFixed(2));
    temp.push(Math.round((Math.random()*15000)+1000));
    row = temp.join(',');
    return row+'\n';
}

let checkFileExists = (filepath) => {
    return new Promise(function(resolve,reject){
        fs.access(filepath,(err)=>{
            if(err){
                resolve(false);
            }
            reject({message:'file already exists'});
        })
    })
}

let writeToFile = async(filepath,numberOfRows) => {
    try{
        let writeableStream = fs.createWriteStream(filepath)
                                .on('error', err =>{
                                    close();
                                    throw err;
                                })
                                .on('finish',()=>{
                                    Promise.resolve();
                                });
        writeableStream.write('"Sell", "List", "Living", "Rooms", "Beds", "Baths", "Age", "Acres", "Taxes"\n');
        for(let i = 0; i < numberOfRows-1;i++){
            writeableStream.write(generateRow());
        }
        writeableStream.end(generateRow());
    }catch(err){
        throw err;
    } 
}

const checkReqBody = (body) => {
    return new Promise((resolve,reject)=>{
        if(!body){
            reject({status:400,message:"Request empty"})
        }
        if(!body.filename || !body.rows){
            reject({status:400,message:"One or more fields is empty!"});
        }
        if(body.rows < 1){
            reject({status:400,message: 'We have to generate at least 1 row!'});
        }
        if(body.rows > 5000000){
            reject({status:400,message:'Cant generate more than 5 milion rows!'});
        }
        resolve();
    })
}

router.get('/', (req,res,next)=> {
    res.render('seed');
})

router.post('/',async(req,res,next)=>{
    try{
        let body = await checkReqBody(req.body);
        let exists = await checkFileExists('./test_files/'+req.body.filename+'.csv');
        if(!exists){
            let response = await writeToFile('./test_files/'+req.body.filename+'.csv',req.body.rows);
            console.log(response);
            res.redirect('/');
        }
    }catch(err){
        next(err);
    }
})

module.exports = router;