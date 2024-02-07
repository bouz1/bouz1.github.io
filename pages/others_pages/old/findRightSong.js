function findSong(audio) {
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
console.log(namel_sh);
console.log('i', i, 'sum t', t,'time_play', time_play, 'i time of MP3',timel_sh[i],);
console.log('i title of MP3',namel_sh[i],'seed',seed);
//var audio = document.getElementById("id_audio");
audio.setAttribute('src', namel_sh[i]);
var delta_time=timel_sh[i]-(t-time_play);
//console.log(namel_sh[i])
document.getElementById("title").value=namel_sh[i];
console.log('delta_time',delta_time);
console.log('total_time',audio.duration);


audio.currentTime = delta_time; 
audio.play();


}