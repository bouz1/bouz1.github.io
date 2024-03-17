 /****************************************************************/
 /******************** Tab Manager *******************************/
 /****************************************************************/
 function funtab(butt){
    buttID=butt.id;
    tabID=buttID.replace("butt","tab");
    tabs=document.getElementsByClassName("div_tabi");
    for (var i = 0; i < tabs.length; i++) {
        if (tabs[i].id ==tabID){
            tabs[i].style.display = "block";
        }
        else{
            tabs[i].style.display = "none";
        }
    }
}

/****************************************************************/
/*********************** Function of TAB1 ***********************/
/****************************************************************/

function Mensualite_cal(){
    var cap=document.getElementById("cap1").value;
    var taux=document.getElementById("taux1").value/100;
    var durN=12*document.getElementById("duration1").value;//12 = Months
    var Mens=mens_cal(cap,taux,durN);

    document.getElementById("Mens1").value=Mens.toFixed(2);
    var Tot1=(Mens*durN);
    document.getElementById("Tot1").value=Tot1.toFixed(2);
    var CoutCredit1=Tot1-cap;
    document.getElementById("CoutCredit1").value= CoutCredit1.toFixed(2);
    var CoutCreditMens1=CoutCredit1/durN;
    document.getElementById("CoutCreditMens1").value=  CoutCreditMens1.toFixed(2);
    
}

function mens_cal(cap,taux,durN){
    // Mensualité = [(C*t)/12] / [1-(1+(t/12))^-n]
    if (taux ==0){
        var Mens=cap/durN;  
    }
    else {
        var Mens=((cap*taux)/12) / (1-(1+(taux/12))**(-durN));
    }
    
    return Mens;
}
/****************************************************************/
/*********************** Function of TAB2 ***********************/
/****************************************************************/
function show_head_details2(){
    var check=document.getElementById("show_details_2_cbx").checked;
    var div_=document.getElementById("det_div_ID2")
    if (check){
        div_.style.visibility = 'visible';
    }
    else {
        div_.style.visibility = 'hidden';
    }  
}
function mainTAB2(){
    /**Dépense**/
    var prix2 = parseFloat(document.getElementById("prix2").value);
    var NotPourc2 = parseFloat(document.getElementById("NotPourc2").value);
    var NotCout2=prix2*NotPourc2/100;
    document.getElementById("NotCout2").value=NotCout2;
    var FraisDoss2= parseFloat(document.getElementById("FraisDoss2").value);
    var courtage2= parseFloat(document.getElementById("courtage2").value);
    var frais_garentie2=parseFloat(document.getElementById("frais_garentie2").value);
    var depTot2=prix2+NotCout2+FraisDoss2+courtage2+frais_garentie2;
    document.getElementById("depTot2").value=depTot2;
    /**Financement**/
    var apporPers2 = parseFloat(document.getElementById("apporPers2").value);
    var PTZ2 = parseFloat(document.getElementById("PTZ2").value);
    var chbPTZ=document.getElementById("ptzCbx2").checked;
    
    if (isNaN(PTZ2) || chbPTZ){
        PTZ2=Math.min(84000,0.4*depTot2);
        document.getElementById("PTZ2").value=PTZ2;
        document.getElementById("ptzCbx2").checked=true;
    }
    var actLog2 = parseFloat(document.getElementById("actLog2").value);
    var chbAcLog=document.getElementById("actLogCbx2").checked;
    if (isNaN(actLog2 ) || chbAcLog){
        actLog2 =30000;
        document.getElementById("actLog2").value=actLog2 ;
        document.getElementById("actLogCbx2").checked=true;
    }
    var pretclass2=Math.max(depTot2-(apporPers2+PTZ2 +actLog2),0);
    document.getElementById("pretclass2").value=pretclass2;
    amortissement();
}

function amortissement(){
    /* PTZ */
	var PTZ2= parseFloat(document.getElementById("PTZ2").value);
	var tauxPTZ2= parseFloat(document.getElementById("tauxPTZ2").value)/100;
	var debutPTZ2= parseFloat(document.getElementById("debutPTZ2").value)-1;
	var finPTZ2= parseFloat(document.getElementById("finPTZ2").value);
	var durN=12*((finPTZ2-debutPTZ2));
    var mensPTZ2 = mens_cal(PTZ2,tauxPTZ2,durN);

    var actLog2= parseFloat(document.getElementById("actLog2").value);
	var tauxactLog2= parseFloat(document.getElementById("tauxactLog2").value)/100;
	var debutactLog2= parseFloat(document.getElementById("debutactLog2").value)-1;
	var finactLog2= parseFloat(document.getElementById("finactLog2").value);
	durN=12*((finactLog2-debutactLog2));
    var mensactLog2 = mens_cal(actLog2,tauxactLog2,durN);

    var pretclass2= parseFloat(document.getElementById("pretclass2").value);
	var tauxpretclass2= parseFloat(document.getElementById("tauxpretclass2").value)/100;
	var debutpretclass2= parseFloat(document.getElementById("debutpretclass2").value)-1;
	var finpretclass2= parseFloat(document.getElementById("finpretclass2").value);
	durN=12*((finpretclass2-debutpretclass2));
    //var menspretclass2 = mens_cal(pretclass2,tauxpretclass2,durN);

    var MensTot2= parseFloat(document.getElementById("MensTot2").value);
    var dureeTot2=parseFloat(document.getElementById("dureeTot2").value)*12;
    var assurTaux = parseFloat(document.getElementById("assurTaux").value)/100;
    var autre_charge= parseFloat(document.getElementById("autre_charge").value);

    var apporPers2 = parseFloat(document.getElementById("apporPers2").value);
    
    /////////// Binary search
    MensMax=2000;
    MensMin=0;
    DeltaMin=20;
    MensTot2=1000;
    for( var i = 0 ;i<20;i++){
    var cap_remb=add_table_details2(PTZ2,tauxPTZ2,debutPTZ2,finPTZ2,mensPTZ2,
        actLog2,tauxactLog2,debutactLog2,finactLog2,mensactLog2,
        pretclass2,tauxpretclass2,debutpretclass2,finpretclass2,//menspretclass2,
        dureeTot2,MensTot2,assurTaux,autre_charge );
    //console.log(i,MensTot2,cap_remb,pretclass2,MensMin,MensMax);
    if (cap_remb < pretclass2-DeltaMin){
        MensTot2old=MensTot2;
        MensTot2=MensTot2+(MensTot2-MensMin)/2;
        MensMin=MensTot2old;
        //console.log("neg");
    }
    else if (cap_remb > pretclass2+ DeltaMin){
        MensTot2old=MensTot2;
        MensTot2=MensTot2-(MensMax-MensTot2)/2;
        MensMax=MensTot2old;
        //console.log("pos");
    }
    else break;
    //console.log(i,MensTot2,cap_remb,pretclass2 ,MensMin,MensMax);
    }
    document.getElementById("MensTot2").value=MensTot2.toFixed(2);

    document.getElementById("depTotal2").value=(MensTot2*dureeTot2+apporPers2).toFixed(2);

}

function add_table_details2(PTZ2,tauxPTZ2,debutPTZ2,finPTZ2,mensPTZ2,
    actLog2,tauxactLog2,debutactLog2,finactLog2,mensactLog2,
    pretclass2,tauxpretclass2,debutpretclass2,finpretclass2,//menspretclass2,
    dureeTot2,MensTot2,assurTaux,autre_charge ){

    var PTZ20=PTZ2;
    var actLog20=actLog2;
    var pretclass20=pretclass2;

    var assMensPTZ2=assurTaux*PTZ2/12;
    var assMensactLog2=assurTaux*actLog2/12;
    var assMenspretclass2=assurTaux*pretclass2/12;

    var table = document.getElementById("det_table_ID2");
    // REMOVE ALL ROWS : INITIALISATION OF THE TABLE 
    var rows = table.querySelectorAll("tr");
    // index 2 (skipping the header row)
    for (var i = 2; i < rows.length; i++) {
        rows[i].remove();
    }

    //var rembourTot2=0;

    for (i=0;i<dureeTot2;i++){
        var row = table.insertRow();
        mens=0;
        row.insertCell().textContent=i+1;
        row.insertCell().textContent=Math.trunc(1+i/12);

        // PTZ
        var cell = row.insertCell();
        var mensPTZ2_=0;
        var partInteret=0;
        var interet=0;
        var captot=0;
        if (i/12>=debutPTZ2 & i/12<finPTZ2){
            mens+=mensPTZ2; 
            mensPTZ2_ =mensPTZ2;
            partInteret=PTZ2*tauxPTZ2/12;
        }
        
        cell.textContent=mensPTZ2_.toFixed(2);
        //rembourTot2+=mensPTZ2_;

        if (i/12>=finPTZ2){
            var cell = row.insertCell();
            assMensPTZ2=0;
            cell.textContent=assMensPTZ2.toFixed(2);
        }
        else {
            var cell = row.insertCell();
            cell.textContent=assMensPTZ2.toFixed(2);
        }
        //rembourTot2+=assMensPTZ2;

        var cell = row.insertCell();
        cell.textContent=partInteret.toFixed(2);
        interet+=partInteret;

        var cell = row.insertCell();
        var partCap=(mensPTZ2_-partInteret);
        cell.textContent=partCap.toFixed(2);
        captot+=partCap;

        var cell = row.insertCell();
        cell.textContent=(PTZ20-PTZ2).toFixed(2);
        
        var cell = row.insertCell();
        cell.textContent=PTZ2.toFixed(2);
        PTZ2-=partCap;

        // Action logement 
        var cell = row.insertCell();
        var mensactLog2_=0;
        var partInteret=0;
        if (i/12>=debutactLog2 & i/12<finactLog2){
            mens+=mensactLog2; 
            mensactLog2_ =mensactLog2;
            partInteret=actLog2*tauxactLog2/12;
        }
        cell.textContent=mensactLog2_.toFixed(2);
        //rembourTot2+=mensactLog2_;


        if (i/12>=finactLog2){
            var cell = row.insertCell();
            assMensactLog2=0;
            cell.textContent=assMensactLog2.toFixed(2);
        }
        else {
            var cell = row.insertCell();
            cell.textContent=assMensactLog2.toFixed(2);
        }
        //rembourTot2+=assMensactLog2;

        var cell = row.insertCell();
        cell.textContent=partInteret.toFixed(2);
        interet+=partInteret;

        var cell = row.insertCell();
        var partCap=(mensactLog2_-partInteret);
        cell.textContent=partCap.toFixed(2);
        captot+=partCap;

        var cell = row.insertCell();
        cell.textContent=(actLog20-actLog2).toFixed(2);
        
        var cell = row.insertCell();
        cell.textContent=actLog2.toFixed(2);
        actLog2-=partCap;
       
        // Prêt classique

        if (i/12>=finpretclass2){
            var cell = row.insertCell();
            assMenspretclass2=0;
            cell.textContent=assMenspretclass2.toFixed(2);
        }
        else {
            var cell = row.insertCell();
            cell.textContent=assMenspretclass2.toFixed(2);
        }

        var cell = row.insertCell();
        var menspretclass2_=0;
        var partInteret=0;
        var assTot2=assMenspretclass2+assMensPTZ2+assMensactLog2;
        var menspretclass2=MensTot2-mensactLog2_-mensPTZ2_-autre_charge-assTot2;
        if (i/12>=debutpretclass2 & i/12<finpretclass2){
            mens+=menspretclass2; 
            menspretclass2_ =menspretclass2;
            partInteret=pretclass2*tauxpretclass2/12;
        }
        cell.textContent=menspretclass2_.toFixed(2);


        var cell = row.insertCell();
        cell.textContent=partInteret.toFixed(2);
        interet+=partInteret;

        var cell = row.insertCell();
        var partCap=(menspretclass2_-partInteret);
        cell.textContent=partCap.toFixed(2);
        captot+=partCap;

        var cell = row.insertCell();
        var cap_remb=pretclass20-pretclass2;
        cell.textContent=(cap_remb).toFixed(2);
        
        var cell = row.insertCell();
        cell.textContent=pretclass2.toFixed(2);
        pretclass2-=partCap;
        /*** Others ***/
        var cell = row.insertCell();
        cell.textContent=interet.toFixed(2);


        var cell = row.insertCell();
        cell.textContent=assTot2.toFixed(2);
        /*
        var cell = row.insertCell();
        cell.textContent=captot.toFixed(2);
        */
         
    }
    //document.getElementById("depTotal2").value=rembourTot2.toFixed(0);
    
    

    return cap_remb
}

// plot_details();

// Function to convert column to array
function columnToArray(table, columnIndex,rawstart) {
    var dataArray = [];
    var rows = table.rows;
    for (var i =rawstart; i < rows.length; i++) {
        var cell = rows[i].cells[columnIndex];
        dataArray.push(parseFloat(cell.textContent.trim()));
    }
    return dataArray;
}

function plot_details(months,ptz,actlog,pretnorm){

var table = document.getElementById("det_table_ID2");
var months=columnToArray(table, 0,3);
var RestCapPTZ=columnToArray(table, 3,3);
// Define Data
var data = [
{
x:months,
y:RestCapPTZ,
mode: 'lines' ,
fill: 'tozeroy', // area plot
name: "pretnorm",
stackgroup: 'group1' // stackgroup name
}/*,
{
x:months,
y:ptz,
mode: 'lines' ,
fill: 'tozeroy', // area plot
stackgroup: 'group1' // stackgroup name
},
{
x:months,
y:actlog,
mode: 'lines' ,
fill: 'tozeroy', // area plot
stackgroup: 'group1' // stackgroup name
}*/];

// Define Layout
var layout = {
//xaxis: {range: [40, 160], title: "Square Meters _"},
//yaxis: {range: [5, 16], title: "Price in Millions"},  
title: "House Prices vs. Size"
};

// Display using Plotly
Plotly.newPlot("PlotID2", data, layout);
}




/****************************************************************/
/*********************** Initialization *************************/
/****************************************************************/
function onload_init(){
    document.getElementById("butt2").click();
    show_head_details2();
    mainTAB2();
    Mensualite_cal();
}
