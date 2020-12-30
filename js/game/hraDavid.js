// robene kniznicou pixi.js
// nazorny priklad: http://scottmcdonnell.github.io/pixi-examples/index.html?s=demos&f=dragging.js&title=Dragging 

// x1, x2, y1, y2 definuju stvorec kde je obrazok dropnutelny
// x, y su suradnice kam sa presne dropne (nie je to vzdy stred toho "stvorca" kedze kraje su
// nepravidelnych tvarov a velkosti, preto nepouzivam napr. funkciu average)
// ukazalo sa ze existuje nieco ako hitArea ... vela roboty by sa usetrilo ...

const kraje = [
    {
        src: "../res/imagesHraDavid/finskoBrown.png",
        drop: {x1: 93.5, x2: 171.5, y1: 11, y2: 106, x: 126.5, y: 63},
        spawn: {x: 141.5, y: 298}
    },
    {
        src:  "../res/imagesHraDavid/finskoLightBlue.png",
        drop: {x1: 103.5, x2: 121.5, y1: 82, y2: 153, x: 113.5, y: 120},
        spawn: {x: 22.5, y: 307}
    },
    {
        src:  "../res/imagesHraDavid/finskoRed.png",
        drop: {x1: 88.5, x2: 194.5, y1: 86.5, y2: 237, x: 126.5, y: 204},
        spawn: {x: 193.5, y: 485}
    },
    {
        src:  "../res/imagesHraDavid/finskoPurple.png",
        drop: {x1: 51.5, x2: 111.5, y1: 306, y2: 341, x: 83.5, y: 318},
        spawn: {x: 247.5, y: 216}
    },
    {
        src:  "../res/imagesHraDavid/finskoYellow.png",
        drop: {x1: 93.5, x2: 134.5, y1: 268, y2: 338, x: 115, y: 313},
        spawn: {x: 247.5, y: 91}
    },
    {
        src:  "../res/imagesHraDavid/finskoDarkPurple.png",
        drop: {x1: 136.5, x2: 183.5, y1: 269, y2: 353, x: 168, y: 303},
        spawn: {x: 39.5, y: 88}
    },
    {
        src:  "../res/imagesHraDavid/finskoOrange.png",
        drop: {x1: 186, x2: 259, y1: 275, y2: 364, x: 215, y: 314},
        spawn: {x: 57.5, y: 461}
    },
    {
        src: "../res/imagesHraDavid/finskoBlue.png",
        drop: {x1: 41, x2: 85, y1: 352, y2: 400, x: 63, y: 371},
        spawn: {x: 207.5, y: 56}
    },
    {
        src:  "../res/imagesHraDavid/finskoGreen.png",
        drop: {x1: 77, x2: 157, y1: 368, y2: 395, x: 118, y: 379},
        spawn: {x: 55.5, y: 206}
    }    
]

var matched = 0;
// base setup pre pixi

var renderer = PIXI.autoDetectRenderer(290, 600,{ transparent: true });
//renderer.backgroundColor = 0xC0C0C0;
document.getElementById("game").appendChild(renderer.view);
var stage = new PIXI.Container();

function createKraje(){ // postupne prida do stageu obrazky zo sourcu na pravo od mapy
    let randomKrajeArray = shuffleArray(kraje);
    for (let i = 0; i < randomKrajeArray.length; i++){
        let kraj = PIXI.Texture.from(randomKrajeArray[i].src);
        createKraj(randomKrajeArray[i].spawn.x,randomKrajeArray[i].spawn.y, kraj, randomKrajeArray[i].drop);
    }
}

function createKraj(x, y, texture, dropArea){
    let kraj = new PIXI.Sprite(texture);
    kraj.dropArea = dropArea;
    kraj.interactive = true;
    kraj.anchor.set(0.5); // nech to je na strede ukotvene
    setUpDragEvents(kraj);
    kraj.position.x = x;
    kraj.position.y = y;
    stage.addChild(kraj);
}

function createBackground(){ // hranice
    let countryTexture = PIXI.Texture.from("../res/imagesHraDavid/finskoBLANK (2).png");
    let country = new PIXI.Sprite(countryTexture);
    country.position.x = 0;
    country.position.y = 0;
    stage.addChild(country);
}

function setUpDragEvents(kraj){ // drag eventy
    // desktop
    kraj.on('mousedown', onDragStart);
    kraj.on('mouseup', onDragEnd);
    kraj.on('mouseupoutside', onDragEnd);
    kraj.on('mousemove', onDragMove);
    // touchscreen
    kraj.on('touchstart', onDragStart);
    kraj.on('touchend', onDragEnd);
    kraj.on('touchendoutside', onDragEnd);
    kraj.on('touchmove', onDragMove);
}

// default funkcie pre dragging v pixi + funkcionalita k hre

requestAnimationFrame(animate); 

function animate(){ // vyrenderuje stage v rendereri, bez tohto sa tam nic nezobrazi
    requestAnimationFrame(animate);
    renderer.render(stage);
}

function onDragStart(event){
    this.data = event.data;
    this.dragging = true;
}

function onDragEnd(){
    if(isInPlace(this)){ // koniec hry
        putInDropArea(this);
        matched++;
        if(gameOver()){
            console.log("GAMEOVER");
            showGameOverSuccessText();
            stopClock();
        }
    }
    console.log("LO" + this.data.global["x"].toString() +" " + this.data.global["y"].toString());
    this.dragging = false; // musi byt
    this.data = null;
}

function putInDropArea(kraj){
    kraj.position.x = kraj.dropArea.x;
    kraj.position.y = kraj.dropArea.y;
    kraj.interactive = false;
}

function onDragMove(){ // bez tohto sa poloha neupdatuje
    if (this.dragging) {
        let newPosition = this.data.getLocalPosition(this.parent);
        this.position.x = newPosition.x;
        this.position.y = newPosition.y;
    }
}

// nejake pomocne funkcie

function shuffleArray(array){ // nech je to na zaciatku rozhadzane
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

function isInPlace(kraj){ // test ci je kraj v dropArei
    if (kraj.dropArea.x1 <= kraj.position.x && kraj.dropArea.x2 >= kraj.position.x 
        && kraj.dropArea.y1 <= kraj.position.y && kraj.dropArea.y2 >= kraj.position.y){
            return true;
    }
    return false;
}

function average(n1, n2){
    return Math.floor((n1 + n2)/2);
}

function gameOver(){
    if (matched == kraje.length){
        return true;
    }
    return false;
}

function showGameOverSuccessText(){
    let text = new PIXI.Text('Správne',{fontFamily : 'Arial', fontSize: 50, fill : 0x00FF00, });
    text.position.x = 50;
    text.position.y = 190;
    stage.addChild(text);
}

// stopky

var startTime;
var timerInterval;

function timeToString(time){ // matika s casom
    let hours = time / 3600000;
    let flooredHours = Math.floor(hours);
    let minutes = (hours - flooredHours) * 60;
    let flooredMinutes = Math.floor(minutes);
    let seconds = (minutes - flooredMinutes) * 60;
    let flooredSeconds = Math.floor(seconds);
    return flooredMinutes.toString().padStart(2, "0") + " : " + flooredSeconds.toString().padStart(2, "0"); // inac je tam 0:0
}

function printTime(){
    elapsedTime = Date.now() - startTime;
    document.getElementById("gameTime").innerHTML = timeToString(elapsedTime);
}

function startClock(){
    startTime = Date.now();
    timerInterval = setInterval(printTime, 1000);
}

function stopClock(){
    clearInterval(timerInterval);
}

// reset/zacatie hry

document.getElementById("playBtn").onclick = function() {
    startGame();
}

function clearStage(){
    for (let i = stage.children.length - 1; i >= 0; i--) {
            stage.removeChild(stage.children[i]);
    }
}

function clearScore(){
    matched = 0;
}

function startGame(){
    document.getElementById("gameTime").innerHTML = "00 : 00";
    clearScore();
    clearStage();
    createBackground();
    createKraje();
    startClock();
}

// "demo"

function sleep(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function autoFillStage(){
    for (let i = 1; i < stage.children.length; i++){ // 0. prvok je background, posledny je text ked skonci hra
        let kraj = stage.children[i];
        await sleep(500);
        putInDropArea(kraj);
        console.log(stage.children[i].dropArea);
    }
    await sleep(500);
}
  
async function autoFillGame(){
    stopClock();
    clearStage();
    createBackground();
    createKraje();
    document.getElementById("gameTime").innerHTML = "00 : 00";
    await autoFillStage(); // nech sa text ukaze az po vyplneni
    showGameOverFailureText();
}

function showGameOverFailureText(){
    let text = new PIXI.Text('Neplatný \n pokus',{fontFamily : 'Arial', fontSize: 50, fill : 0x00FF00, outline: 0x000000});
    text.position.x = 55;
    text.position.y = 180;
    stage.addChild(text);
}

function hasGivenUp(){
    if (gameOver()){
        return false;
    }
    return true;
}

document.getElementById("demoBtn").onclick = function(){
    autoFillGame();
}

createBackground();

/*function getTrueWidthRatio(origX){ // prepocet kvoli responzivite
    let ratio = origX*100/1229.4;
    return clientWidth*0.9/100*ratio; // marna snaha bude to natvrdo
}*/