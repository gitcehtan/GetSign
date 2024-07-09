const fontColor = document.getElementById("fontColor");
const backgroundColor = document.getElementById("backgroundColor");
const canvas = document.getElementById("myCanvas");
const clearBtn = document.getElementById("clearBtn");
const saveBtn = document.getElementById("saveBtn");
const fontSize = document.getElementById("fontSize");
const retrieveBtn = document.getElementById('retrieveBtn');

const ctx = canvas.getContext('2d');




// Function to apply the background color
function applyBackgroundColor(color) {
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

// Apply initial background color
applyBackgroundColor("white");



fontColor.addEventListener('change',(e)=>{
    ctx.strokeStyle = e.target.value;
    ctx.fillStyle = e.target.value;
})

canvas.addEventListener('mousedown',(e)=>{
    isDrawing = true;
    lastX = e.offsetX;
    lastY = e.offsetY;
})

canvas.addEventListener('mousemove',(e)=>{
    if(isDrawing){
        ctx.beginPath();
        ctx.moveTo(lastX,lastY);
        ctx.lineTo(e.offsetX,e.offsetY);
        ctx.stroke();

        lastX = e.offsetX;
        lastY = e.offsetY;
    }
})

canvas.addEventListener('mouseup',() => {
    isDrawing = false;
})

backgroundColor.addEventListener('change',(e)=> {
    ctx.fillStyle = e.target.value;
    ctx.fillRect(0,0,800,500)
})

fontSize.addEventListener('change',(e)=> {
    ctx.lineWidth = e.target.value
})

clearBtn.addEventListener('click', ()=> {
    ctx.clearRect(0,0,canvas.width,canvas.height);
})


saveBtn.addEventListener('click',()=>{
    localStorage.setItem('canvasContents',canvas.toDataURL());

    let link = document.createElement('a');

    link.download = "my-sign.png";

    link.href = canvas.toDataURL();

    link.click();
})

retrieveBtn.addEventListener('click', ()=> {
    let savedCanvas = localStorage.getItem('canvasContents');

    if(savedCanvas)
    {
        let img = new Image();
        img.src = savedCanvas;
        ctx.drawImage(img,0,0);
    }
})