var xmlData;
var meniny = [];


document.addEventListener('DOMContentLoaded', ()=>{
    loadDoc();
});

function loadDoc() {
    var xhttp = new XMLHttpRequest();
    let url = "/res/xml/meniny.xml";
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        console.log("lol");
        myFunction(this);
      }
    };
    xhttp.open("GET", url, true);
    xhttp.send();
}

function myFunction(xml) {
    var i;
    var xmlDoc = xml.responseXML;
    var table="<tr><th>den</th><th>SK</th></tr>";
    var x = xmlDoc.getElementsByTagName("zaznam");
    for (i = 0; i <x.length; i++) {
        try{
            table += "<tr><td>" +
            x[i].getElementsByTagName("den")[0].childNodes[0].nodeValue +
            "</td><td>" +
            x[i].getElementsByTagName("SK")[0].childNodes[0].nodeValue +
            "</td></tr>";
        }
        catch{

        }
        document.getElementById("demo").innerHTML = table;
    }
    
}
