const colors = [
    "rgb(255, 200, 200)",
    "rgb(255, 100, 100)",
    "rgb(255, 50, 50)",
    "rgb(255, 0, 0)",
    "rgb(200, 200, 255)",
    "rgb(100, 100, 255)",
    "rgb(50, 50, 255)",
    "rgb(0, 0, 255)",
    "rgb(200, 0, 200)",
    "rgb(100, 10, 100)",
    "rgb(31, 0, 31)",
    "rgb(255, 255, 200)",
    "rgb(255, 255, 100)",
    "rgb(255, 255, 50)",
    "rgb(255, 255, 0)",
    "rgb(255, 255, 50)",
    "rgb(0, 0, 0)",
];
let avableNumbers = [2, 4];
let cont = document.getElementById("cont");
let score = 0;
let sizeX = 4;
let sizeY = 4;
let numberOfElements = 0;

let matrix = [];



const getRandomNumber = (numbers) => {
    let index = Math.floor(Math.random() * numbers.length);
    return numbers[index];
}

const getHighScore = () => {
    return 0;
}

const clear = () => {
    for (let i = 0; i < sizeX; i++) {
        matrix.push([]);
    }
    for (let i = 0; i < sizeX; i++) {
        for (let j = 0; j < sizeY; j++) {
            matrix[i][j] = {number: 0, element: undefined};
        }
    }
}

const createNewElement = () => {
    let number = getRandomNumber(avableNumbers);
    let colorIndex = Math.log2(number);
    let backgroundColor = colors[colorIndex];
    let element = document.createElement("div");
    element.classList.add("number");
    element.style.backgroundColor = backgroundColor;
    element.textContent = number;
    cont.appendChild(element);
    return element;
}

const busyPosition = (top, left) => {
    if (matrix[top][left].element != undefined) {
        return true; 
    }
    return false;
}

const setElementPosition = (element) => {
    let top, left;
    do {
        top = Math.floor(Math.random() * 4)
        left = Math.floor(Math.random() * 4);
    }
    while (busyPosition(top, left));
    element.style.left = `${left * 25}%`;
    element.style.top = `${top * 25}%`;
    matrix[top][left].number = element.textContent;
    matrix[top][left].element = element;
    console.log(matrix)
}

const start = () => {
    score = 0;
    getHighScore();
    clear();
    addNew();
}

const gameOver = () => {
    console.log("gameOver!");
}

const checkGameOver = () => {
    let maxNumberOfElements = sizeX * sizeY;
    if (numberOfElements === maxNumberOfElements) {
        return true;
    }
    return false;
}

const addNew = () => {
    console.log(numberOfElements, "pre")
    let isOver = checkGameOver();
    if (isOver){
        gameOver();
        return;
    }
    let element = createNewElement();
    setElementPosition(element);
    numberOfElements++;
    console.log(numberOfElements, "posle")
}

const detectKey = (event) =>{
    let key = event.key;
    switch (key) {
        case "ArrowUp":
            moveUp();
        case "ArrowDown":
            moveDown();
        case "ArrowLeft":
            moveLeft();
        case "ArrowRight":
            moveRight();
    }
}

const moveUp = () => {
    let speed = 0;
    for (let i = 0; i < sizeX; i++){
        for (let j = 0; j < sizeY; j++){
            if (matrix[i][j].element) {
                let element = matrix[i][j].element;
                let number = matrix[i][j].number;
                let firstPosition = i;
                let lastPosition;
                if (canGoUp(i)) {
                    let upperElement = i - 1;
                    let currentElement = i;
                    while (matrix[upperElement][j].element == undefined) {
                        // pomeri na gore
                        matrix[upperElement][j].element = element;
                        console.log(matrix[upperElement][j].element);
                        matrix[upperElement][j].number = number;
                        //izbriši odozdo
                        matrix[currentElement][j].element = undefined;
                        matrix[currentElement][j].number = 0;
                        //podesi za novi krug
                        console.log("element je premešten na poziciju", upperElement, j)
                        currentElement--;
                        upperElement--;
                        lastPosition = currentElement;
                        //proveri izlaz
                        console.log(matrix);
                        if (upperElement == -1) {
                            break;
                        }
                    }
                    console.log(firstPosition, lastPosition);
                    speed = (firstPosition - lastPosition) * 0.25;
                    element.style.transitionDuration = `${speed}s`;
                    element.style.top = `${lastPosition * 25}%`;
                }
            }
        }
    }
    setTimeout(() => {
        addNew();
    }, speed * 1000);
}

const canGoUp =(y) =>{
    if (y != 0) {
        return true;
    }
    else {
        return false;
    }
}

const moveDown = () => {
    return;
}
const moveLeft = () => {
    return;
}

const moveRight = () => {
    return;
}



//event listeners:
addEventListener("load", start)
addEventListener("keyup", (event) => detectKey(event))