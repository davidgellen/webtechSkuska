//využitá knižnica pixi js
//drag demo: http://scottmcdonnell.github.io/pixi-examples/index.html?s=demos&f=dragging.js&title=Dragging

const rakuskoKraje = [
    {
        "src": "../res/imagesHraPatrik/vieden.png",
        "povodnaX": "432",
        "povodnaY": "446.4",
        "finalnaX":"624",
        "finalnaY":"108.8"
    },
    {
        "src": "../res/imagesHraPatrik/dolne_rakusko.png",
        "povodnaX": "100",
        "povodnaY": "400",
        "finalnaX":"568.8",
        "finalnaY":"111.9"
    },
    {
        "src": "../res/imagesHraPatrik/horne_rakusko.png",
        "povodnaX": "200",
        "povodnaY": "400",
        "finalnaX":"399.7",
        "finalnaY":"130.2"
    },
    {
        "src": "../res/imagesHraPatrik/korutansko.png",
        "povodnaX": "300",
        "povodnaY": "400",
        "finalnaX":"400",
        "finalnaY":"311.2"
    },
    {
        "src": "../res/imagesHraPatrik/osttirolsko.png",
        "povodnaX": "445",
        "povodnaY": "400",
        "finalnaX":"278.4",
        "finalnaY":"292"
    },
    {
        "src": "../res/imagesHraPatrik/burgenland.png",
        "povodnaX": "525",
        "povodnaY": "400",
        "finalnaX":"645.6",
        "finalnaY":"210.4"
    },
    {
        "src": "../res/imagesHraPatrik/salzbursko.png",
        "povodnaX": "600",
        "povodnaY": "400",
        "finalnaX":"322.4",
        "finalnaY":"212.8"
    },
    {
        "src": "../res/imagesHraPatrik/stajersko.png",
        "povodnaX": "700",
        "povodnaY": "400",
        "finalnaX":"492",
        "finalnaY":"245.6"
    },
    {
        "src": "../res/imagesHraPatrik/tirolsko.png",
        "povodnaX": "800",
        "povodnaY": "400",
        "finalnaX":"172",
        "finalnaY":"245.6"
    },
    {
        "src": "../res/imagesHraPatrik/vorarlbersko.png",
        "povodnaX": "850",
        "povodnaY": "400",
        "finalnaX":"36",
        "finalnaY":"243.9"
    }
]

const renderer = PIXI.autoDetectRenderer({ 
    width: window.innerWidth,
    height: window.innerHeight,
    transparent: true 
});
document.getElementById("hra").appendChild(renderer.view);
const stage = new PIXI.Container();
stage.pivot.x = stage.width/4;
stage.pivot.y = stage.height/7;
stage.x = renderer.width/4;
stage.y = renderer.height/7;
const pozadieTextura = PIXI.Texture.from('../res/imagesHraPatrik/rakusko.png');
const pozadie = new PIXI.Sprite(pozadieTextura);
stage.addChild(pozadie);

requestAnimationFrame(animate); 

function animate(){
    requestAnimationFrame(animate);

     // render the stage
    renderer.render(stage);
}

var sparovane = 0;

for (var i = 0; i < rakuskoKraje.length; i++)
{
    let krajTextura = PIXI.Texture.from(rakuskoKraje[i].src);
    vytvorKraj(rakuskoKraje[i].povodnaX, rakuskoKraje[i].povodnaY, rakuskoKraje[i].finalnaX, rakuskoKraje[i].finalnaY, krajTextura);
}
var demoIterator = 1;
zapnutStopky();

/*window.addEventListener('resize', resize);

function resize(){
    renderer.resize(window.innerWidth, window.innerHeight);
}

var size = new PIXI.Rectangle(0,0,window.innerWidth, window.innerHeight);
var s = size.width/renderer.width;
if(s > size.height/renderer.height) s = size.height/renderer.height;
renderer.scale.x = renderer.scale.y = s;
renderer.x = Math.round((size.width-renderer.width)/2);*/

function vytvorKraj(povodnaX, povodnaY, finalnaX, finalnaY, textura)
{
    var kraj = new PIXI.Sprite(textura);
    // enable kraj to be interactive... this will allow it to respond to mouse and touch events
    kraj.interactive = true;
    // this button mode will mean the hand cursor appears when you roll over kraj with your mouse
    kraj.buttonMode = true;
    // center kraj anchor point
    kraj.anchor.set(0.5);

    // setup events for mouse and touch
    kraj
        // events for drag start
        .on('mousedown', onDragStart)
        .on('touchstart', onDragStart)
        // events for drag move
        .on('mousemove', onDragMove)
        .on('touchmove', onDragMove)
        // events for drag end
        .on('mouseup', onDragEnd)
        .on('mouseupoutside', onDragEnd)
        .on('touchend', onDragEnd)
        .on('touchendoutside', onDragEnd);


    // move the sprite to its designated position
    kraj.position.x = povodnaX;
    kraj.position.y = povodnaY;

    
    kraj.finalnaX = finalnaX;
    kraj.finalnaY = finalnaY;

    // add it to the stage
    stage.addChild(kraj);
}

function onDragStart(event)
{
    // store a reference to the data
    // the reason for this is because of multitouch
    // we want to track the movement of this particular touch
    this.data = event.data;
    this.alpha = 0.5;
    this.dragging = true;
}

function onDragMove()
{
    if (this.dragging)
    {
        var newPosition = this.data.getLocalPosition(this.parent);
        this.position.x = newPosition.x;
        this.position.y = newPosition.y;
    }
}


function onDragEnd()
{
    this.alpha = 1;
    this.dragging = false;
    
    if(((parseFloat(this.x) > parseFloat(this.finalnaX) - parseFloat(20)) && (parseFloat(this.x) < parseFloat(this.finalnaX) + parseFloat(20))) &&
    ((parseFloat(this.y) > parseFloat(this.finalnaY) - parseFloat(20)) && (parseFloat(this.y) < parseFloat(this.finalnaY) + parseFloat(20))))
    {
        this.x = this.finalnaX;
        this.y = this.finalnaY;
        this.interactive = false;
        this.buttonMode = false;
        sparovane++;
        if(sparovane == rakuskoKraje.length){
            vypnutStopky();
            document.getElementById("hlaska").textContent = "Vyhral si!";
        }
    }
    // set the interaction data to null
    this.data = null;
}

var sekundy = 0;
var minuty = 0;

function zapnutStopky(){
    document.getElementById("stopky").style.display = "block";
    stopkyTimeout = setTimeout(function(){
        sekundy = sekundy + 1;
        if(sekundy >59){
            sekundy = 0;
            minuty = minuty + 1; 
        }
        document.getElementById("stopky").textContent = "Čas: " + minuty + " min " + sekundy + " sek";
        
        zapnutStopky();
    },1000);
}

function vypnutStopky(){
    clearTimeout(stopkyTimeout);
    sekundy = 0;
    minuty = 0;
}

function znovaHrat(){
    location.reload();
}

function krajePovodneMiesta(){
    vypnutStopky();
    document.getElementById("hlaska").textContent = "Skús to znova!";
    document.getElementById("stopky").style.display = "none";
    document.getElementById("demobtn").disabled = true;
    for (let i = 1; i < stage.children.length; i++){
        let kraj = stage.children[i];
        kraj.interactive = true;
        kraj.buttonMode = true;
        kraj.position.x = kraj.povodnaX;
        kraj.position.y = kraj.povodnaY;
    }
}

function demo() {  
    setTimeout(function() {   
        console.log(demoIterator);
        let kraj = stage.children[demoIterator];
        kraj.position.x = kraj.finalnaX;
        kraj.position.y = kraj.finalnaY;
        kraj.interactive = false;
        kraj.buttonMode = false;
        demoIterator++;                    
        if (demoIterator < (rakuskoKraje.length + 1)) {          
            demo();             
        }                       
    }, 1000)

}

