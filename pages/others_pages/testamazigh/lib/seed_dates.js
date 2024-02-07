function get_UTC_date(){
// UTC to avoid localisation error 
var currentUTCDate = new Date();
var dateUTC=Date(currentUTCDate);
return dateUTC;
}

function convertDateToYYYYMM(date) {
    var year = date.getFullYear();
    var month = date.getMonth() + 1; // JavaScript months are 0-11
    month = month < 10 ? '0' + month : month; // prepend 0 if month is < 10
    return parseInt('' + year + month); // output  INT 202401
}


function convertYYYYMMToDate(intDate) {
    var strDate = String(intDate);
    var year = parseInt(strDate.substr(0, 4));
    var month = parseInt(strDate.substr(4, 2)) - 1; // JavaScript months are 0-11
    var day =01;
    var outDate=new Date(year, month, day);
    return outDate;
}

function Month_seconds(){
var currentDate = new Date(get_UTC_date());
var Date01=convertYYYYMMToDate(convertDateToYYYYMM(currentDate));
var delta_time_s=(currentDate.getTime()- Date01.getTime())/1000.0;
return delta_time_s}

function Month_seed(){
var currentDate = new Date(get_UTC_date());
var seed=convertDateToYYYYMM(currentDate);
return seed}

/*
// Test
var seed=Month_seed();
var dt_s=Month_seconds();
console.log('seed',seed,'delta t from the begenning of the month (s)', dt_s);
*/


