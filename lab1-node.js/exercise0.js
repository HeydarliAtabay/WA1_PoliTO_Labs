'use strict';

const tmp = ["spring","university","quarantine","rossa","Atabay"]; 

for(let i=0; i< tmp.length; i ++) {
    if(tmp[i].length < 2)
        tmp[i] = "";
    else 
        tmp[i] =  tmp[i].substring(0,2) +  tmp[i].substring(tmp[i].length -2,  tmp[i].length);
}
console.log(tmp);

