var jwt = require('jsonwebtoken');

const checkToken = async(cookieToken) =>{
    try{
        let check = jwt.verify(cookieToken,'$!GMOPHE_#T@M#MH#_T');
        console.log(check);
        return(check);
    }catch(err){
        throw err;
    }
}

module.exports = checkToken;