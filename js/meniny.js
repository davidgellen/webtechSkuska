/*document.getElementById("meninyDateInputSubmit").onclick = function(){
    findMeninyFromDate();
}

document.getElementById("meninyNameInputSubmit").onclick = function(){
    findDateFromMeniny();
}*/



// cast pre komponent kjhvhgv

const templateMeniny = document.createElement("template");
templateMeniny.innerHTML = `
<p id = "currentDate"></p>

    <style> @import "../css/meniny.css"; </style>
    <style> @import "../bootstrap-4.3.1-dist/css/bootstrap.min.css"; </style>

    <p id = "currentMeninyParagprah">Dnes má meniny (Slovensko): <span id = "currentMeniny"></span></p>

    <div class="row">
        <div class="mb-2 pt-2 pb-2 col-12 col-md-7 col-lg-6">
            <select class="form-control" name="countrySelect" id="countrySelect">
                <option value="SKd">Slovensko</option>
                <option value="CZ">Česko</option>
                <option value="HU">Maďarsko</option>
                <option value="PL">Poľsko</option>
                <option value="AT">Rakúsko</option>
            </select>
        </div>
    </div><br>

    <label for="meninyDateInput">Dátum:</label>
    <div class="row">
        <div class="pb-2 col-12 col-md-4">
            <input type="text" class="form-control" id="meninyDateInput" name="meninyDateInput">
        </div>
        <div class="pb-2 col-8 col-md-3">
            <button type = "button" class = "btn btn-secondary" id = "meninyDateInputSubmit">Nájdi meno</button>
        </div>
    </div>
   

    <p id ="meninyDateInputResult"></p>

    <label for="meninyNameInput">Meno: </label>
    <div class="row">
        <div class="pb-2 col-12 col-md-4">
            <input type="text" class="form-control" id="meninyNameInput" name="meninyNameInput">
        </div>
        <div class="pb-2 col-12 col-md-3">
            <button type = "button" class = "btn btn-secondary" id = "meninyNameInputSubmit">Nájdi dátum</button>
        </div>
    </div>
  
    
    <p id ="meninyNameInputResult"></p>

    <div class="row justify-content-center justify-content-md-start">
        <div class="col-10 col-sm-5 col-md-3 tooltip_content" id="meniny_tooltip">
            <p>Validné formáty: <br> dd.mm. <br> dd.m. <br> d.mm. <br> d.m.</p>
        </div>
    </div>
`;

class Meniny extends HTMLElement{
    constructor(){
        super();
        this.attachShadow({mode:"open"});
        this.shadowRoot.appendChild(templateMeniny.content.cloneNode(true));
    }
    connectedCallback(){
        var xmlData;
        var xmlDoc;

        document.addEventListener('DOMContentLoaded', ()=>{
            loadDoc();
            showCurrentDate();
        });

        function loadDoc() {
            var xhttp = new XMLHttpRequest();
            let url = "../res/xml/meniny.xml";
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
        
        var currentDate = this.shadowRoot.querySelector("#currentDate");

        function showCurrentDate(){
            let today = new Date();
            let day = String(today.getDate()).padStart(2, '0');
            let month = String(today.getMonth() + 1).padStart(2, '0'); //Januar je 0 lebo js ...
            let year = today.getFullYear();
            currentDate.innerHTML = day + '.' + month + '.' + year;
        }

        var currentMeniny = this.shadowRoot.querySelector("#currentMeniny");
        function getCurrentMeniny(){
            let today = new Date();
            let day = add0atStart(String(today.getDate()).padStart(2, '0'));
            let month = add0atStart(String(today.getMonth() + 1).padStart(2, '0'));
            for (let i = 0; i <xmlData.length; i++) {
                let xmlDate = xmlData[i].getElementsByTagName("den")[0].childNodes[0].nodeValue;
                if (xmlDate.substring(0,2) === month && xmlDate.substring(2,4) === day){
                    currentMeniny.innerHTML =  xmlData[i].getElementsByTagName("SK")[0].childNodes[0].nodeValue;
                    break;
                }    
            }
        }


        // TODO: aby naslo vsetky meniny nie len slovenske

        var inputDate = this.shadowRoot.querySelector("#meninyDateInput");
        var countryInput = this.shadowRoot.querySelector("#countrySelect");
        var meninyDateResult = this.shadowRoot.querySelector("#meninyDateInputResult");
        function findMeninyFromDate(){
            //https://www.oreilly.com/library/view/regular-expressions-cookbook/9781449327453/ch04s04.html
            //let regex = new RegExp('^(0[1-9]|[12][0-9]|3[01])[.](0[1-9]|1[012])$');
            let regex = new RegExp('^(3[01]|[12][0-9]|0?[1-9]).(1[0-2]|0?[1-9]).$');
            let inputValue = inputDate.value;
            console.log(inputValue);
            let countryValue = countryInput.value;
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
                        meninyDateResult.innerHTML = result;
                        meninyDateResult.style.color = "black";
                        break;
                    }    
                }
            } else {
                meninyDateResult.innerHTML = "Nesprávny formát dátumu!";
                meninyDateResult.style.color = "red";
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
        
        var inputName = this.shadowRoot.querySelector("#meninyNameInput");
        var meninyNameInputResult = this.shadowRoot.querySelector("#meninyNameInputResult");
        function findDateFromMeniny(){
            let nameInput = removeAllDiakritika(inputName.value.toLowerCase());
            let country = countryInput.value;
            let found = false;
            if(nameInput.length>0){
                for (let i = 0; i <xmlData.length; i++) {
                    let xmlDate = xmlData[i].getElementsByTagName("den")[0].childNodes[0].nodeValue; 
                    try{
                        // vraj ked sa takto retazia metody vyzeram jak pan
                        let currentNames = removeAllDiakritika(xmlData[i].getElementsByTagName(country)[0].childNodes[0].nodeValue.toLowerCase()).split(", ");  
                        if (currentNames.includes(nameInput)){
                            meninyNameInputResult.innerHTML = transfromDenToDate(xmlDate);
                            found = true;
                            meninyNameInputResult.style.color = "black";
                            break;
                        }
                    }
                    catch{} // 100% best javascript practice right here in front of your Augen
                } 
            }
            if (nameInput.length<1){
                meninyNameInputResult.innerHTML = "Nezadané meno!";
                meninyNameInputResult.style.color = "red";
            } else if (!found) {
                meninyNameInputResult.innerHTML = "Nenašlo sa.";
                meninyNameInputResult.style.color = "red";
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
            let result = "";
            for (let i = 0; i < string.length; i ++){
                result = result + removeDiakritika(string.charAt(i));
            }
            return result;
        }

        function sleep(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }
        
        var meninyTooltip = this.shadowRoot.querySelector("#meniny_tooltip");

        async function showTooltip(){
            meninyTooltip.style.opacity = 1;
            await(sleep(4000));
            meninyTooltip.style.opacity = 0;
        }
        this.shadowRoot.querySelector("#meninyDateInputSubmit").onclick = function(){
            findMeninyFromDate();
        }
        
        this.shadowRoot.querySelector("#meninyNameInputSubmit").onclick = function(){
            findDateFromMeniny();
        }
        
    }
}
customElements.define('meniny-getter', Meniny);