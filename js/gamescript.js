var winGuard=0;
var demoWasStarted=0;

var draggableId;
var myWidth=1;
var myHeight=1;

var hours =0;
var mins =0;
var seconds =0;

function startGame(){
  if(demoWasStarted==1){
    $('#nr').animate({top:"74vw",left:"65vw"});
    $('#tt').animate({top:"50vw",left:"0vw"});
    $('#ba').animate({top:"50vw",left:"17vw"});
    $('#bb').animate({top:"14.3vw",left:"22.5vw"});
    $('#pe').animate({top:"4.5vw",left:"40.25vw"});
    $('#ke').animate({top:"12.5vw",left:"44.10vw"});
    $('#tn').animate({top:"7vw",left:"8.75vw"});
    $('#za').animate({top:"1.5vw",left:"21.25vw"});
  }
  startTimer();
  $('#tt').draggable();
  $('#tn').draggable();
  $('#ba').draggable();
  $('#bb').draggable();
  $('#nr').draggable();
  $('#pe').draggable();
  $('#ke').draggable();
  $('#za').draggable();
};

function gameDemo(){
  $('#nr').animate({top:"18.20vw",left:"12.2vw"});
  $('#tt').animate({top:"15vw",left:"3vw"});
  $('#ba').animate({top:"19.5vw",left:"1.80vw"});
  $('#bb').animate({top:"14.3vw",left:"22.5vw"});
  $('#pe').animate({top:"4.5vw",left:"40.25vw"});
  $('#ke').animate({top:"12.5vw",left:"44.10vw"});
  $('#tn').animate({top:"7vw",left:"8.75vw"});
  $('#za').animate({top:"1.5vw",left:"21.25vw"});
  demoWasStarted=1;

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
          $('#ba').animate({top:"19.5vw",left:"1.80vw"});
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
   