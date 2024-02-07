////////////////////////////////////
// SEED_DATES MODEULE
////////////////////////////////////

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





////////////////////////////////////
// RANDOM SHUFFLE 
////////////////////////////////////

  function mulberry32(seed) {
    return function() {
      var t = seed += 0x6D2B79F5;
      t = Math.imul(t ^ t >>> 15, t | 1);
      t ^= t + Math.imul(t ^ t >>> 7, t | 61);
      return ((t ^ t >>> 14) >>> 0) / 4294967296;
    }
  }

  function seededShuffle(array_inp, seed) {
    var array = [...array_inp]; // copy the array to avoid change it 
    var random = mulberry32(seed);
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }
  
  
  
  
////////////////////////////////////
// Principal module
////////////////////////////////////

function src_search (){
  var namel = names();
  var timel=times();
  var tot_tim=tot_times(); 
  var Month_s=Month_seconds();
  var time_play= Month_s % tot_tim;

  var seed= Month_seed();
  var namel_sh=seededShuffle(namel, seed);
  var timel_sh=seededShuffle(timel, seed);
  var t=0
  for (i=0;i< timel_sh.length ;i++ ){
    t+=timel_sh[i];
    if (t > time_play) break; 
  }
  //console.log(namel_sh);
  //console.log('i', i, 'sum t', t,'time_play', time_play, 'i time of MP3',timel_sh[i],);
  //console.log('i title of MP3',namel_sh[i],'seed',seed);
  //var audio = document.getElementById("id_audio");

  var delta_time=timel_sh[i]-(t-time_play);
  var src = namel_sh[i];
  return { src: src, delta_time: delta_time };
}

function src_only(){
var result = src_search();
  var src = result.src;
  return src;
	
}



function play_song(audio) {

  var result = src_search();
  var src = result.src;
  var delta_time = result.delta_time;
  audio.setAttribute('src', 'mp3/'+src);
  
  console.log(src);
  
  audio.currentTime = delta_time; 
  //audio.play();
}