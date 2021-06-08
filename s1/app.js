const b = document.getElementsByClassName('main-body')[0];
b.addEventListener("click",()=>{
    console.log("test");
})

function setup(){
    
    const can = createCanvas(windowWidth,b.clientHeight);
    can.parent(b);
    background(0);
}