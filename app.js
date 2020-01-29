const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext('2d');
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

const INITIAL_COLOR = "2c2c2c";
const INITIAL_CANVAS_SIZE = 500;

canvas.width = INITIAL_CANVAS_SIZE;
canvas.height = INITIAL_CANVAS_SIZE;

ctx.fillStyle = "white";
ctx.fillRect(0,0,canvas.width, canvas.height );

ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;



//console.log("hello");

let painting = false;
let filling = false;

function stopPainting(){
    painting = false;
}

function startPainting(){
    //console.log(event);
    painting = true;

}

function onMouseMove(event){

    const x = event.offsetX;
    const y = event.offsetY;
    //console.log(painting);

    if(!painting){
        //console.log("createing path in ", x, y);
        ctx.beginPath();
        ctx.moveTo(x, y);

     }else {
        //console.log("createing line in ", x, y);
        ctx.lineTo(x, y);
        ctx.stroke();
    }

}

function handleColorClick(event) {
    //console.log(event.target.style);
    const color = event.target.style.backgroundColor;
    console.log(color);
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    console.log(ctx.strokeStyle);
}

function handleRangeChange(event){
    console.log(event.target.value);
    ctx.lineWidth = event.target.value;
}

function handleModeChange(){
    console.log(filling);
    if(filling === true) {
        filling = false;
        mode.innerText = "Fill";
    } else {
        filling = true;
        mode.innerText = "Paint";
        //ctx.fillStyle = color;
    }
}

function handleCanvasClick(){
    if(filling){
        //ctx.fillStyle = ctx.strokeStyle;
        ctx.fillRect(0,0,canvas.width, canvas.height );

    }
}


function handleCM(event){
    //console.log(event);
    event.preventDefault();
}

function handleSaveClick(){
    
    const image  = canvas.toDataURL();
    const link = document.createElement("a");

    link.href = image;
    link.download = "PaintJS[A]";
    console.log(link);
    link.click();
}


if(canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu", handleCM);
}

Array.from(colors).forEach(potato=>potato.addEventListener("click", handleColorClick));

if(range) {
    range.addEventListener("input", handleRangeChange);
}


if(mode) {
    mode.addEventListener("click", handleModeChange);
}

if(saveBtn) {
    saveBtn.addEventListener("click", handleSaveClick);
}