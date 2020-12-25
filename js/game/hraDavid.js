const kraje = [
    {
        name: "BA",
        src: "../res/imagesHraDavid/baKraj.png",
        drop: {x1: 340, x2: 410, y1: 160, y2: 220, x: 387, y: 190}
    },
    {
        name: "TT",
        src:  "../res/imagesHraDavid/ttKraj.png",
        drop: {x1: 390, x2: 440, y1: 128, y2: 257, x: 412, y: 191}
    },
    {
        name: "TR",
        src:  "../res/imagesHraDavid/trKraj.png",
        drop: {x1: 414, x2: 513, y1: 80, y2: 146, x: 471, y: 111}
    },
    {
        name: "NR",
        src:  "../res/imagesHraDavid/nrKraj.png",
        drop: {x1: 449, x2: 520, y1: 175, y2: 260, x: 497, y: 208}
    },
    {
        name: "ZI",
        src:  "../res/imagesHraDavid/ziKraj.png",
        drop: {x1: 514, x2: 626, y1: 30, y2: 119, x: 574, y: 75}
    },
    {
        name: "BB",
        src:  "../res/imagesHraDavid/bbKraj.png",
        drop: {x1: 515, x2: 656, y1: 128, y2: 227, x: 597, y: 170}
    },
    {
        name: "PR",
        src:  "../res/imagesHraDavid/prKraj.png",
        drop: {x1: 660, x2: 841, y1: 51, y2: 100, x: 754, y: 84}
    },
    {
        name: "KE",
        src:  "../res/imagesHraDavid/keKraj.png",
        drop: {x1: 678, x2: 834, y1: 122, y2: 171, x: 762, y: 146}
    },
]

var matched = 0;

var clientWidth = document.documentElement.clientWidth;
var clientHeight = document.documentElement.clientHeight;

var renderer = PIXI.autoDetectRenderer(Math.max(document.documentElement.clientWidth*0.9 || 0, window.innerWidth*0.9 || 0), 300);
document.getElementById("game").appendChild(renderer.view);
var stage = new PIXI.Container();

var imageScale = 1;
var widthRatio;

function createKraje() {
    let randomKrajeArray = shuffleArray(kraje);
    for (let i = 0; i < randomKrajeArray.length; i++){
        let kraj = PIXI.Texture.from(randomKrajeArray[i].src);
        //kraje.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
        createKraj(Math.floor(Math.random() * clientWidth*0.9) , 250, kraj, randomKrajeArray[i].drop);
    }
}

function createBackground(){
    let countryTexture = PIXI.Texture.from("../res/imagesHraDavid/SKblank.png");
    let country = new PIXI.Sprite(countryTexture);
    country.position.x = (clientWidth*0.9)/2 - 534/2;
    country.position.y = 11;
    stage.addChild(country);
}

function setUpDragEvents(kraj){
    kraj.on('mousedown', onDragStart);
    kraj.on('touchstart', onDragStart);
    kraj.on('mouseup', onDragEnd);
    kraj.on('mouseupoutside', onDragEnd);
    kraj.on('touchend', onDragEnd);
    kraj.on('touchendoutside', onDragEnd);
    kraj.on('mousemove', onDragMove);
    kraj.on('touchmove', onDragMove);
}

function createKraj(x, y, texture, dropArea)
{
    let kraj = new PIXI.Sprite(texture);
    kraj.dropArea = dropArea;
    kraj.interactive = true;
    kraj.buttonMode = true;
    kraj.anchor.set(0.5); // nech to je na strede
    setUpDragEvents(kraj);
    kraj.position.x = x;
    kraj.position.y = y;
    stage.addChild(kraj);
}

requestAnimationFrame( animate );

function animate() {
    requestAnimationFrame(animate);
    renderer.render(stage);
}

function onDragStart(event)
{
    this.data = event.data;
    this.dragging = true;
}

function onDragEnd()
{
    console.log(this.data.global["x"].toString() +" " + this.data.global["y"].toString());
    if(isInPlace(this)){
        this.position.x = this.dropArea.x;
        this.position.y = this.dropArea.y;
        this.interactive = false;
        matched++;
        if(gameOver()){
            console.log("GAMEOVER");
            showGameOverText();
            stopClock();
        }
    }
    this.dragging = false;
    this.data = null;
}

function onDragMove()
{
    if (this.dragging)
    {
        let newPosition = this.data.getLocalPosition(this.parent);
        this.position.x = newPosition.x;
        this.position.y = newPosition.y;
    }
}

function shuffleArray(array) { // nech je to na zaciatku rozhadzane
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

function isInPlace(kraj){
    if (kraj.dropArea.x1 <= kraj.position.x && kraj.dropArea.x2 >= kraj.position.x 
        && kraj.dropArea.y1 <= kraj.position.y && kraj.dropArea.y2 >= kraj.position.y){
            return true;
    }
    return false;
}

function average(n1, n2){
    return Math.floor((n1+n2)/2);
}

function gameOver(){
    if (matched == kraje.length){
        return true;
    }
    return false;
}

function showGameOverText(){
    let text = new PIXI.Text('Hra dokončená',{fontFamily : 'Arial', fontSize: 50, fill : 0xff1010, });
    text.position.x = (clientWidth*0.9)/2 - 130;
    text.position.y = 125;
    stage.addChild(text);
}

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

function printTime() {
    elapsedTime = Date.now() - startTime;
    document.getElementById("gameTime").innerHTML = timeToString(elapsedTime);
}

var timerInterval;
function startClock() {
    startTime = Date.now();
    timerInterval = setInterval(printTime, 1000);
}

function stopClock(){
    clearInterval(timerInterval);
}

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
    clearScore();
    clearStage();
    createBackground();
    createKraje();
    startClock();
}

function getTrueWidthRatio(origX){ // matika proste
    return origX*100/1229.4;
}