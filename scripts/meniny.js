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
        craeteTableSK();
        getCurrentMeniny();
      }
    };
    xhttp.open("GET", url, true);
    xhttp.send();
}

function craeteTableSK() {
    let table="<tr><th>den</th><th>SK</th></tr>";
    for (let i = 0; i <xmlData.length; i++) {
        try{
            table += "<tr><td>" +
            xmlData[i].getElementsByTagName("den")[0].childNodes[0].nodeValue +
            "</td><td>" +
            xmlData[i].getElementsByTagName("SK")[0].childNodes[0].nodeValue +
            "</td></tr>";
        }
        catch{

        }
        document.getElementById("demo").innerHTML = table;
    }
    
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
    console.log("getCurrentMeniny");
    let today = new Date();
    let day = String(today.getDate()).padStart(2, '0');
    let month = String(today.getMonth() + 1).padStart(2, '0');
    console.log("den: " + day + " month: " + month);
    for (let i = 0; i <xmlData.length; i++) {
        let xmlDate = xmlData[i].getElementsByTagName("den")[0].childNodes[0].nodeValue;
        if (xmlDate.substring(0,2) === month && xmlDate.substring(2,4) === day){
            document.getElementById("currentMeniny").innerHTML =  xmlData[i].getElementsByTagName("SK")[0].childNodes[0].nodeValue;
            break;
        }    
    }
}

function findMeninyFromDate(){
    //https://www.oreilly.com/library/view/regular-expressions-cookbook/9781449327453/ch04s04.html
    //let regex = new RegExp('^(0[1-9]|[12][0-9]|3[01])[.](0[1-9]|1[012])$');
    let regex = new RegExp('^(3[01]|[12][0-9]|0?[1-9]).(1[0-2]|0?[1-9])$');
    inputValue = document.getElementById("meninyDateInput").value;
    let regexValid = regex.test(inputValue);
    if (regexValid){
        let split = inputValue.split(".");
        let day = add0atStart(split[0]);
        let month = add0atStart(split[1]);
        console.log(month + day);
        for (let i = 0; i <xmlData.length; i++) {
            let xmlDate = xmlData[i].getElementsByTagName("den")[0].childNodes[0].nodeValue;
            if (xmlDate.substring(0,2) === month && xmlDate.substring(2,4) === day){
                document.getElementById("meninyDateInputResult").innerHTML =  xmlData[i].getElementsByTagName("SK")[0].childNodes[0].nodeValue;
                break;
            }    
        }
    } else {
        console.log("invalid regex");
    }
}

function add0atStart(string){
    if (string.length == 1){
        return "0"+string;
    } else {
        return string;
    }
}

document.getElementById("meninyDateInputSubmit").onclick = function(){
    findMeninyFromDate();
}
