const b = document.getElementsByClassName('main-body')[0];
b.addEventListener("click", () => {
    console.log("test");
})

let height = 0;
let width = 0;

let x = [];
let y = [];
let nn;
let predics = []
const option = {
    inputs: 1,
    outputs: 1,
    task: "regression",
    debug: false,
    learningRate: 0.01,
    layers: [
        {
            type: 'dense',
            units: 16,
            activation: 'relu',
        },
        {
            type: 'dense',
            activation: 'sigmoid',
        },
    ]
}

function setup() {

    const can = createCanvas(windowWidth, b.clientHeight);
    width = windowWidth;
    predics = new Array(width).fill(0);
    height = b.clientHeight;
    can.parent(b);
    background(222);


    nn = ml5.neuralNetwork(option);//네트워크 만들기
}

let flag = false;
function mouseClicked() {
    console.log(mouseX, mouseY);

    x.push(mouseX);
    y.push(mouseY);
    customDraw();


    nn.addData([mouseX], [mouseY]);
    if (x.length === 20) {
        customTrain();
    }
}

function customDraw() {
    background(222);
    strokeWeight(2);
    stroke(255, 0, 0);
    for (let i = 0; i < x.length; i++) {
        circle(x[i], y[i], 10);
    }
    for (let i = 0; i < predics.length; i++) {
        strokeWeight(2);
        stroke(0, 255, 0);
        circle(i, predics[i], 1);
    }
}

function customTrain() {
    nn.normalizeData();
    nn.train({
        epochs: flag ? 10 : 10,
    }, () => {  
        console.log("학습완료");
        predict();
    });
}


function predict() {
    for (let i = 0; i < width; i++) {
        nn.predict([i], (err, result) => {
            predics[i] = result[0].value;
            if(i===width-1){
                flag=true;
                customDraw();
                customTrain();
            }
        })
    }

}

