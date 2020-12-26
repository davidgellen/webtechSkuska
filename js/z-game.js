var seconds = 0;
var minutes = 0;
var hours = 0;
var t;
var stopwatch = document.getElementById("stopwatch");

const allStates = 10;
var completedStates;
var currentDraggingId;

const statesPositions = new Map()
statesPositions.set('argentina', {top: "47.5%", left: "32.7%"})
statesPositions.set('bolivia', {top: "32%", left: "35%"})
statesPositions.set('brasil', {top: "10.5%", left: "29.5%"})
statesPositions.set('paraguay', {top: "45%", left: "43%"})
statesPositions.set('colombia', {top: "-0.3%", left: "23.5%"})
statesPositions.set('uruguay', {top: "62.5%", left: "48.5%"})
statesPositions.set('ecuador-peru', {top: "15.5%", left: "16.7%"})
statesPositions.set('venezuela', {top: "0%", left: "30.5%"})
statesPositions.set('gu-sur-fgu', {top: "4%", left: "45.5%"})
statesPositions.set('chile', {top: "41.5%", left: "28.4%"});

/*
*** stopwatch code inspired from https://jsfiddle.net/Daniel_Hug/pvk6p/ ***
*/

function add(){
    seconds++;
    if (seconds >= 60) {
        seconds = 0;
        minutes++;
        if (minutes >= 60) {
            minutes = 0;
            hours++;
        }
    }

    stopwatch.textContent = (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds);
    
    timer();
}

function timer(){
    t = setTimeout(add, 1000);
}

/* 
*** end *** 
*/

$(document).ready(function(){
    stopwatch.textContent = "00:00:00";
    seconds = 0; minutes = 0; hours = 0;
    timer();

    completedStates = 0;
})

$(".country").draggable({
    start: function(event, ui){
        currentDraggingId = this.id;
        console.log(currentDraggingId);
    }
});

$(".country-pos").droppable({
    drop: function(event, ui){
        if((this.id.substring(0, this.id.length - 4)) == currentDraggingId || (this.id.substring(0, this.id.length - 5)) == currentDraggingId){
            putImgOnMap(currentDraggingId);
            console.log(this.id);
        }
    }
})

function putImgOnMap(imgElementId){
    var element = document.getElementById(imgElementId);
    element.style.left = statesPositions.get(imgElementId).left;
    element.style.top = statesPositions.get(imgElementId).top;
    $('#' + imgElementId).draggable("disable");
    completedStates++;
    checkEndOfGame(completedStates);
}

function checkEndOfGame(completedStates){
    if(completedStates == allStates){
        console.log("equal");
        clearTimeout(t);
        var info = document.createElement("p");
        var infoText = document.createTextNode("VYHRALI STE!");
        info.appendChild(infoText);
        info.className = "col col-md-2 text-center";
        document.getElementById("time-div").appendChild(info).style.color = "red";
    }
}