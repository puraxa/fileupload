var express = require('express');
var router = express.Router();
var fs = require('fs');

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

let writeToFile = (filepath,numberOfRows) => {
    let writableStream = fs.createWriteStream(filepath);
    return new Promise(function(resolve, reject){
        writableStream.write('"Sell", "List", "Living", "Rooms", "Beds", "Baths", "Age", "Acres", "Taxes"\n',err => {
            reject(err);
        });
        for(let i = 0; i < numberOfRows-2; i++ ){
            writableStream.write(generateRow(),err => {
                reject(err);
            });
        }
        writableStream.end(generateRow(),err => {
            reject(err);
        });
        resolve('succesfully written to file!');
    })
            
}

router.get('/', (req,res,next)=> {
    // let writableStream = fs.createWriteStream('./test_files/test31231.txt');
    // writableStream.write('"Sell", "List", "Living", "Rooms", "Beds", "Baths", "Age", "Acres", "Taxes"\n');
    // for(let i = 0; i < 1000000; i++ ){
    //     writableStream.write(generateRow());
    // }
    res.render('seed');
})

router.post('/',async(req,res,next)=>{
    try{
        let exists = await checkFileExists('./test_files/'+req.body.filename+'.csv');
        console.log(exists);
        if(!exists){
            let response = writeToFile('./test_files/'+req.body.filename+'.csv',req.body.rows);
            res.redirect('/');
        }
    }catch(err){
        next(err);
    }
        // checkFileExists('./test_files/'+ req.body.filename)
        //     .then(() => {})
        //     .catch(err => next(err));
    // fs.access('./test_files/'+ req.body.filename, (err)=> {
    //     if(err){
    //         let writableStream = fs.createWriteStream('./test_files/'+req.body.filename);
    //         writableStream.write('"Sell", "List", "Living", "Rooms", "Beds", "Baths", "Age", "Acres", "Taxes"\n');
    //         for(let i = 0; i < req.body.rows-2; i++ ){
    //             writableStream.write(generateRow());
    //         }
    //         writableStream.end(generateRow());
    //         res.redirect('/');
    //     }
    //     next({message: 'file already exists'});
    //     console.log('file already exists');
    // })
    // console.log(req.body);
    // let writableStream = fs.createWriteStream('./test_files/'+req.body.filename);
    // writableStream.write('"Sell", "List", "Living", "Rooms", "Beds", "Baths", "Age", "Acres", "Taxes"\n');
    // for(let i = 0; i < req.body.rows; i++ ){
    //     writableStream.write(generateRow());
    // }
})

module.exports = router;