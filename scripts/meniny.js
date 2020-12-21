var xmlData;
var xmlDoc;

document.addEventListener('DOMContentLoaded', ()=>{
    loadDoc();
    showCurrentDate();
});

function loadDoc() {
    var xhttp = new XMLHttpRequest();
    let url = "/res/xml/meniny.xml";
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        xmlDoc = this.responseXML;
        xmlData = xmlDoc.getElementsByTagName("zaznam");
        getCurrentMeniny();
      }
    };
    xhttp.open("GET", url, true);
    xhttp.send();
}

//https://stackoverflow.com/questions/1531093/how-do-i-get-the-current-date-in-javascript

function showCurrentDate(){
    let today = new Date();
    let day = String(today.getDate()).padStart(2, '0');
    let month = String(today.getMonth() + 1).padStart(2, '0'); //Januar je 0 lebo js ...
    let year = today.getFullYear();
    document.getElementById("currentDate").innerHTML = day + '.' + month + '.' + year;
}

function getCurrentMeniny(){
    let today = new Date();
    let day = add0atStart(String(today.getDate()).padStart(2, '0'));
    let month = add0atStart(String(today.getMonth() + 1).padStart(2, '0'));
    for (let i = 0; i <xmlData.length; i++) {
        let xmlDate = xmlData[i].getElementsByTagName("den")[0].childNodes[0].nodeValue;
        if (xmlDate.substring(0,2) === month && xmlDate.substring(2,4) === day){
            document.getElementById("currentMeniny").innerHTML =  xmlData[i].getElementsByTagName("SK")[0].childNodes[0].nodeValue;
            break;
        }    
    }
}


// TODO: aby naslo vsetky meniny nie len slovenske

function findMeninyFromDate(){
    //https://www.oreilly.com/library/view/regular-expressions-cookbook/9781449327453/ch04s04.html
    //let regex = new RegExp('^(0[1-9]|[12][0-9]|3[01])[.](0[1-9]|1[012])$');
    let regex = new RegExp('^(3[01]|[12][0-9]|0?[1-9]).(1[0-2]|0?[1-9]).$');
    inputValue = document.getElementById("meninyDateInput").value;
    let countryValue = document.getElementById("countrySelect").value;
    let sviatky = getSviatkyString(countryValue);
    let regexValid = regex.test(inputValue);
    if (regexValid){
        let split = inputValue.split(".");
        let day = add0atStart(split[0]); 
        let month = add0atStart(split[1]);
        for (let i = 0; i <xmlData.length; i++) {
            let xmlDate = xmlData[i].getElementsByTagName("den")[0].childNodes[0].nodeValue;
            if (xmlDate.substring(0,2) === month && xmlDate.substring(2,4) === day){
                let result = "";
                try{
                    result = result + 
                    xmlData[i].getElementsByTagName(countryValue)[0].childNodes[0].nodeValue;
                }
                catch{} // jedno sa tam najde vzdy
                try{
                    result = result + "<br>" +
                    xmlData[i].getElementsByTagName(sviatky)[0].childNodes[0].nodeValue;
                }
                catch{}
                document.getElementById("meninyDateInputResult").innerHTML = result;
                break;
            }    
        }
    } else {
        document.getElementById("meninyDateInputResult").innerHTML = "nesprávny formát dátumu";
        showTooltip();
    }
}

function getSviatkyString(string){
    if(string === "SKd"){
        string = string.slice(0, -1)
    }
    return string+"sviatky";
}

function add0atStart(string){
    if (string.length == 1){
        return "0"+string;
    } else {
        return string;
    }
}

function findDateFromMeniny(){
    let nameInput = removeAllDiakritika(document.getElementById("meninyNameInput").value.toLowerCase());
    let country = document.getElementById("countrySelect").value;
    let found = false;
    if(nameInput.length>0){
        for (let i = 0; i <xmlData.length; i++) {
            let xmlDate = xmlData[i].getElementsByTagName("den")[0].childNodes[0].nodeValue; 
            try{
                // vraj ked sa takto retazia metody vyzeram jak pan
                let currentNames = removeAllDiakritika(xmlData[i].getElementsByTagName(country)[0].childNodes[0].nodeValue.toLowerCase()).split(", ");  
                if (currentNames.includes(nameInput)){
                    document.getElementById("meninyNameInputResult").innerHTML = transfromDenToDate(xmlDate);
                    found = true;
                    break;
                }
            }
            catch{} // 100% best javascript practice right here in front of your Augen
        } 
    }
    if (nameInput.length<1){
        document.getElementById("meninyNameInputResult").innerHTML = "nezadané meno"
    } else if (!found) {
        document.getElementById("meninyNameInputResult").innerHTML = "nanašlo sa";
    }
}

function transfromDenToDate(den){
    let month = remove0atStart(den.substring(0,2));
    let day = remove0atStart(den.substring(2,4));
    return day + "." + month + ".";
}

function remove0atStart(string){
    if(string.charAt(0) == "0"){
        string = string.slice(1);
    }
    return string;
}

function removeDiakritika(char){
    switch(char){
        case "á":
        case "ä":
        case "â":
        case "ă":
        case "ą":
            return "a";
        case "é":
        case "ę":
        case "ë":
        case "ě":    
            return "e";
        case "í":
        case "î":
            return "i";
        case "ó":
        case "ô":
        case "ő":
        case "ö":
            return "o";
        case "ů":
        case "ú":
        case "ű":
        case "ü":
            return "u";
        case "ý":
            return "y";
        case "ď":
        case "đ":
            return "d";
        case "ţ":
        case "ť":
            return "t";
        case "ń":
        case "ň":
            return "n";
        case "ĺ":
        case "ľ":
            return "l";
        case "ŕ":
        case "ř":
            return "r";
        case "ć":
        case "ç":
        case "č":
            return "c";
        case "š":
        case "ś":
        case "ş":
        case "ß":
            return "s";
        case "ź":
        case "ž":
            return "z";
        default:
            return char;
    }
}

function removeAllDiakritika(string) {
    result = "";
    for (let i = 0; i < string.length; i ++){
        result = result + removeDiakritika(string.charAt(i));
    }
    return result;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
  
async function showTooltip(){
    let tooltip = document.getElementById("meniny_tooltip");
    tooltip.style.opacity = 1;
    await(sleep(4000));
    tooltip.style.opacity = 0;
}

document.getElementById("meninyDateInputSubmit").onclick = function(){
    findMeninyFromDate();
}

document.getElementById("meninyNameInputSubmit").onclick = function(){
    findDateFromMeniny();
}
