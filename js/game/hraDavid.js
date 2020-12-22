const krajeDiv = document.getElementById("kraje");

$(document).ready(function() {
    generateKrajeImages();
    draggableElements = document.querySelectorAll(".draggable");
    dropAreaElements = document.querySelectorAll(".dropArea");

    draggableElements.forEach(elem => {
        elem.addEventListener('dragstart', drag);
        //elem.addEventListener('dragend', dragEnd);
    });

    dropAreaElements.forEach(elem => {
        //elem.addEventListener("dragenter", dragEnter);
        elem.addEventListener("dragover", allowDrop);
        //elem.addEventListener("dragleave", dragLeave);
        elem.addEventListener("drop", drop);
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
        krajImage.classList = "draggable droppable";
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

function allowDrop(event) {
    event.preventDefault();
}
  
function drag(event) {
    event.dataTransfer.setData("text", event.target.id);
}
  
function drop(event) {
    event.preventDefault();
    var data = event.dataTransfer.getData("text");
    console.log(data);
    event.target.appendChild(document.getElementById(data));
}

/*function dragStart(event) {
    event.dataTransfer.setData("text", event.target.id);
    console.log("dragStart: " +event.target.classList);
}
  
function dragEnd(event) {
    console.log("dragEnd: " +event.target.classList);
}
  
function dragOver(event) {
    if(event.target.classList && event.target.classList.contains("droppable") && !event.target.classList.contains("dropped")) {
        event.preventDefault();
        console.log("dragOver IF:    " + event.target.classList);
    }
    console.log("dragOver " + event.target.classList);
}
  
function dragEnter(event) {
    //event.preventDefault();
    if(event.target.classList && event.target.classList.contains("droppable") && !event.target.classList.contains("dropped")) {
        event.target.classList.add("droppable-hover");
        console.log("dragEnter IF:    " + event.target.classList);
    }
    console.log("dragEnter: " + event.target.classList);
}
  
function dragLeave(event) {
    if(event.target.classList && event.target.classList.contains("droppable") && !event.target.classList.contains("dropped")) {
        event.target.classList.remove("droppable-hover");
        console.log("dragLeave IF:    " + event.target.classList);
    }
    console.log("dragLeave: " + event.target.classList);
}
  
function dragDrop(event) {
    event.preventDefault();
    event.target.classList.remove("droppable-hover");
    console.log("dragDrop: " + event.target.classList);
}*/
  