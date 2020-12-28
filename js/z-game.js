var seconds = 0;
var minutes = 0;
var hours = 0;
var t;
var stopwatch = document.getElementById("stopwatch");

const allStates = 10;
var completedStates;
var currentDraggingId;

const statesTruePosition = new Map()
statesTruePosition.set('argentina', {top: "47.5", left: "32.7"})
statesTruePosition.set('bolivia', {top: "32", left: "35"})
statesTruePosition.set('brasil', {top: "8.5", left: "29.5"})
statesTruePosition.set('paraguay', {top: "45", left: "42.8"})
statesTruePosition.set('colombia', {top: "-0.3", left: "23.3"})
statesTruePosition.set('uruguay', {top: "61.5", left: "48.5"})
statesTruePosition.set('ecuador-peru', {top: "15.5", left: "16.7"})
statesTruePosition.set('venezuela', {top: "0", left: "30.5"})
statesTruePosition.set('gu-sur-fgu', {top: "4", left: "45.5"})
statesTruePosition.set('chile', {top: "41.5", left: "28.4"});

/*
*** stopwatch code inspired from https://jsfiddle.net/Daniel_Hug/pvk6p/ ***
*** start ***
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

function clearTimer(){
    stopwatch.textContent = "00:00:00";
    seconds = 0; minutes = 0; hours = 0;
}

$(document).ready(function(){
    clearTimer();
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
    element.style.left = statesTruePosition.get(imgElementId).left + '%';
    element.style.top = statesTruePosition.get(imgElementId).top + '%';
    $('#' + imgElementId).draggable("disable");
    completedStates++;
    console.log(element.offsetLeft);
    checkEndOfGame(completedStates);
}

function checkEndOfGame(completedStates){
    if(completedStates == allStates){
        console.log("equal");
        clearTimeout(t);
        var info = document.createElement("p");
        var infoText = document.createTextNode("VYHRALI STE!");
        info.appendChild(infoText);
        info.className = "col-3 col-md-2 text-center";
        document.getElementById("time-div").insertBefore(info, document.getElementById("time-div").children[2]).style.color = "red";
        $('html, body').animate({ scrollTop: 0 }, 'fast');
    }
}

document.querySelector('#demo').onclick = function(){
    clearTimeout(t);
    clearTimer();

    /* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map */
    for (let key of statesTruePosition.keys()){
        $('#' + key).animate({
            top: statesTruePosition.get(key).top + '%',
            left: statesTruePosition.get(key).left + '%'
        }, "slow");
    }
};


document.querySelector('#play').onclick = function(){
    location.reload();
};
