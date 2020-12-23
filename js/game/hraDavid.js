const krajeDiv = document.getElementById("kraje");
var matched = 0;


$(document).ready(function() {
    generateKrajeImages();
    draggableElements = document.querySelectorAll(".draggable");
    dropAreaElements = document.querySelectorAll(".dropArea");

    draggableElements.forEach(elem => {
        elem.addEventListener('dragstart', dragStart);
        //elem.addEventListener('dragend', dragEnd);
    });

    dropAreaElements.forEach(elem => {
        //elem.addEventListener("dragenter", dragEnter);
        elem.addEventListener("dragover", dragOver);
        //elem.addEventListener("dragleave", dragLeave);
        elem.addEventListener("drop", dragDrop);
    });
});

const kraje = [
    {
        name: "BA",
        src: "../res/imagesHraDavid/baKraj.png",
        drop: "BAdrop"
    },
    {
        name: "TT",
        src:  "../res/imagesHraDavid/ttKraj.png",
        drop: "TTdrop"
    },
    {
        name: "TR",
        src:  "../res/imagesHraDavid/trKraj.png",
        drop: "TRdrop"
    },
    {
        name: "NR",
        src:  "../res/imagesHraDavid/nrKraj.png",
        drop: "NRdrop"
    },
    {
        name: "ZI",
        src:  "../res/imagesHraDavid/ziKraj.png",
        drop: "ZIdrop"
    },
    {
        name: "BB",
        src:  "../res/imagesHraDavid/bbKraj.png",
        drop: "BBdrop"
    },
    {
        name: "PR",
        src:  "../res/imagesHraDavid/prKraj.png",
        drop: "PRdrop"
    },
    {
        name: "KE",
        src:  "../res/imagesHraDavid/keKraj.png",
        drop: "KEdrop"
    },
]

function generateKrajeImages(){
    let randomKraje = shuffleArray(kraje);  
    for (let i = 0; i < randomKraje.length; i++){
        let krajImage = document.createElement("img");
        krajImage.classList = "draggable";
        krajImage.setAttribute("id", randomKraje[i].name);
        krajImage.setAttribute("src", randomKraje[i].src);
        krajImage.setAttribute("alt", randomKraje[i].name);
        krajImage.setAttribute("draggable", "true");
        krajImage.setAttribute("data-dropDiv", randomKraje[i].drop);
        krajeDiv.appendChild(krajImage);
    }

    
    
}

function shuffleArray(array) { // nech je to na zaciatku rozhadzane
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

function dragOver(event) {
    event.preventDefault();
}
  
function dragStart(event) { // dobre
    event.dataTransfer.setData("text", event.target.id);
}

function dragOver(event){
    let data = event.dataTransfer.getData("text");
    if(event.target.id == data+"drop"){
        event.preventDefault();
    }
}
  
function dragDrop(event) {
    event.preventDefault();
    let data = event.dataTransfer.getData("text");
    if(event.target.id == data+"drop"){    
        event.target.appendChild(document.getElementById(data));
        document.getElementById(data).setAttribute("draggable", "false");
        matched++;
        //document.getElementById(data).addEventListener("drop", () => {return false;});
    }
}

// stopky

function timeToString(time) { // matika s casom
    let hours = time / 3600000;
    let roundHours = Math.floor(hours);
    let minutes = (hours - roundHours) * 60;
    let roundMinutes = Math.floor(minutes);
    let seconds = (minutes - roundMinutes) * 60;
    let roundSeconds = Math.floor(seconds);
    let minutesString = roundMinutes.toString().padStart(2, "0");
    let secondsString = roundSeconds.toString().padStart(2, "0");
    return minutesString+" : "+secondsString;
}

var timerInterval;
function startClock() {
    startTime = Date.now();
    timerInterval = setInterval(function printTime() {
      elapsedTime = Date.now() - startTime;
      document.getElementById("gameTime").innerHTML = timeToString(elapsedTime);
    }, 10);
}

function stopClock(){
    clearInterval(timerInterval);
}

document.getElementById("playBtn").onclick = function() {
    startClock();
}

document.getElementById("stopBtn").onclick = function() {
    stopClock();
}



