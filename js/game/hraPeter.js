var winGuard=0;
var demoWasStarted=0;

var draggableId;
var myWidth=1;
var myHeight=1;

var hours =0;
var mins =0;
var seconds =0;

function startGame(){
  startTimer();
  $('#tt').draggable();
  $('#tn').draggable();
  $('#ba').draggable();
  $('#bb').draggable();
  $('#nr').draggable();
  $('#pe').draggable();
  $('#ke').draggable();
  $('#za').draggable();
  document.getElementById('demo').disabled=true;
  document.getElementById('start').disabled=true;
};

function gameDemo(){
  $('#tt').delay(500).animate({top:"15vw",left:"3vw"},1700);
  $('#nr').animate({top:"18.20vw",left:"12.2vw"},2300);
  $('#ba').delay(1000).animate({top:"19.25vw",left:"1.80vw"},2000);
  $('#bb').delay(1500).animate({top:"14.3vw",left:"22.5vw"},2000);
  $('#pe').delay(2000).animate({top:"4.5vw",left:"40.25vw"},2000);
  $('#ke').delay(2500).animate({top:"12.5vw",left:"44.10vw"},2000);
  $('#tn').delay(3000).animate({top:"7vw",left:"8.75vw"},2000);
  $('#za').delay(3500).animate({top:"1.5vw",left:"21.25vw"},2000);
  demoWasStarted=1;
  document.getElementById('start').disabled=true;
  document.getElementById('demotry').style.display="block";
};
function startTimer(){
  timex = setTimeout(function(){
      seconds++;
    if(seconds >59){seconds=0;mins++;
      if(mins>59) {
      mins=0;hours++;
        if(hours <10) {$("#hours").text('0'+hours+':')} else $("#hours").text(hours+':');
                      }
                      
    if(mins<10){                     
      $("#mins").text('0'+mins+':');}       
      else $("#mins").text(mins+':');
                  }    
    if(seconds <10) {
      $("#seconds").text('0'+seconds);} else {
      $("#seconds").text(seconds);
      }
    
    
      startTimer();
  },1000);
};


$(document).ready(function() {

  $('#container1').droppable({
      drop: function(event, ui) {
        draggableId = ui.draggable.attr("id");
        if(draggableId=="tt"){
          $('#tt').animate({top:"15vw",left:"3vw"});
          $('#tt').draggable('disable');
          winGuard++;
          
          if(winGuard==8){
            document.getElementById('win').style.display='block';
          }
        }
      }
    });

    $('#container2').droppable({
      drop: function(event, ui) {
        draggableId = ui.draggable.attr("id");
        if(draggableId=="ba"){
          $('#ba').animate({top:"19.25vw",left:"1.80vw"});
          $('#ba').draggable('disable');
          winGuard++;
          if(winGuard==8){
            document.getElementById('win').style.display='block';
            clearTimeout(timex);
          }
        }
      }
    });

    $('#container3').droppable({
      drop: function(event, ui) {
        draggableId = ui.draggable.attr("id");
        if(draggableId=="nr"){
          $('#nr').animate({top:"18.20vw",left:"12.2vw"});
          $('#nr').draggable('disable');
          winGuard++;
          if(winGuard==8){
            document.getElementById('win').style.display='block';
            clearTimeout(timex);
          }
        }
      }
    });
    $('#container4').droppable({
      drop: function(event, ui) {
        draggableId = ui.draggable.attr("id");
        if(draggableId=="bb"){
          $('#bb').animate({top:"14.3vw",left:"22.5vw"});
          $('#bb').draggable('disable');
          winGuard++;
          if(winGuard==8){
            document.getElementById('win').style.display='block';
            clearTimeout(timex);
          }
        }
      }
    });
    $('#container5').droppable({
      drop: function(event, ui) {
        draggableId = ui.draggable.attr("id");
        if(draggableId=="pe"){
          $('#pe').animate({top:"4.5vw",left:"40.25vw"});
          $('#pe').draggable('disable');
          winGuard++;
          if(winGuard==8){
            document.getElementById('win').style.display='block';
            clearTimeout(timex);
          }
        }
      }
    });
    $('#container6').droppable({
      drop: function(event, ui) {
        draggableId = ui.draggable.attr("id");
        if(draggableId=="ke"){
          $('#ke').animate({top:"12.5vw",left:"44.10vw"});
          $('#ke').draggable('disable');
          winGuard++;
          if(winGuard==8){
            document.getElementById('win').style.display='block';
            clearTimeout(timex);
          }
        }
      }
    });
    $('#container7').droppable({
      drop: function(event, ui) {
        draggableId = ui.draggable.attr("id");
        if(draggableId=="tn"){
          $('#tn').animate({top:"7vw",left:"8.75vw"});
          $('#tn').draggable('disable');
          winGuard++;
          if(winGuard==8){
            document.getElementById('win').style.display='block';
            clearTimeout(timex);
          }
        }
      }
    });
    $('#container8').droppable({
      drop: function(event, ui) {
        draggableId = ui.draggable.attr("id");
        if(draggableId=="za"){
          $('#za').animate({top:"1.5vw",left:"21.25vw"});
          $('#za').draggable('disable');
          winGuard++;
          if(winGuard==8){
            document.getElementById('win').style.display='block';
            clearTimeout(timex);
          }
        }
      }
    }
    
    
    );
    
    
   });
   