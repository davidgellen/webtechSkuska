const krajeDiv = document.getElementById("kraje");

$(document).ready(function() {
    generateKrajeImages();
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
        krajImage.setAttribute("src", randomKraje[i].src);
        krajImage.setAttribute("alt", randomKraje[i].name);
        krajImage.setAttribute("draggable", "true");
        krajeDiv.appendChild(krajImage);
    }

    draggableElements = document.querySelectorAll(".draggable");
    droppableElements = document.querySelectorAll(".droppable");

    draggableElements.forEach(elem => {
        elem.addEventListener('dragstart', dragStart);
        elem.addEventListener('dragend', dragEnd);
    });

    droppableElements.forEach(elem => {
        elem.addEventListener("dragenter", dragEnter);
        elem.addEventListener("dragover", dragOver);
        elem.addEventListener("dragleave", dragLeave);
        elem.addEventListener("drop", dragDrop);
    });
    
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



function dragStart(event) {
    event.dataTransfer.setData("text", event.target.id);
}
  
function dragEnd() {
}
  
function dragOver(event) {
    if(event.target.classList && event.target.classList.contains("droppable") && !event.target.classList.contains("dropped")) {
        event.preventDefault();
    }
}
  
function dragEnter(event) {
    //event.preventDefault();
    if(event.target.classList && event.target.classList.contains("droppable") && !event.target.classList.contains("dropped")) {
        event.target.classList.add("droppable-hover");
    }
}
  
function dragLeave(event) {
    if(event.target.classList && event.target.classList.contains("droppable") && !event.target.classList.contains("dropped")) {
        event.target.classList.remove("droppable-hover");
    }
}
  
function dragDrop(event) {
    event.preventDefault();
    event.target.classList.remove("droppable-hover");

}
  