# Simple app for generating and parsing CSV files

After cloning change directory  
``` cd ./fileupload  ```  
Run  
```npm install```  

To start app type  
```npm start```  
Open [localhost:3000](http://localhost:3000) in your browser  
  
If you need to change port you will need to run   
```PORT=/port number/ npm start```  
Generated csv files are stored in  
```fileupload/test_files/"file name".csv```
You will need to provide parameters for connecting to database  
```DB_host=/host/ DB_user=/user/ DB_password=/password/ DB_db=/database npm start```
Or you can crate .env file like 
```DB_host=/host/  
DB_user=/username/  
DB_password=/password/  
DB_db=/database/```