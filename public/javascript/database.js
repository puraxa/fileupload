var mysql = require('mysql2');

const options = {
    host: process.env.DB_host,
    user: process.env.DB_user,
    database: process.env.DB_db,
    password: process.env.DB_password
}

 
const connection = mysql.createConnection(options);

connection.query("CREATE TABLE IF NOT EXISTS `users` (`userID` int(10) NOT NULL AUTO_INCREMENT,`fullname` varchar(100) NOT NULL,`email` varchar(100) NOT NULL,`username` varchar(100) NOT NULL,`password` varchar(255) NOT NULL,PRIMARY KEY (`userID`))",(err,res)=>{
    if(err){
        console.error(err.sqlMessage);
        process.exit();
    }
    //console.log(res);
})

module.exports = connection;