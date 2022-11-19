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

let matrix = [];
for (let i = 0; i < sizeX; i++) {
    matrix.push([]);
}
for (let i = 0; i < sizeX; i++) {
    for (let j = 0; j < sizeY; j++) {
        matrix[i][j] = {number: 0, element: undefined};
    }
}


const getRandomNumber = (numbers) => {
    let index = Math.floor(Math.random() * numbers.length);
    return numbers[index];
}

const getHighScore = () => {
    return 0;
}

const clear = () => {
    return 0;
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

const setElementPosition = (element) => {
    let left = Math.floor(Math.random() * 4);
    let top = Math.floor(Math.random() * 4)
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
    let element = createNewElement();
    setElementPosition(element);
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
    //Prođi kroz sve elemente
    //proveri da li može da ide gore
    // ako može, pomeri ga za n mesta!
    for (let i = 0; i < sizeX; i++){
        for (let j = 0; j < sizeY; j++){
            if (matrix[i][j].element) {
                element = matrix[i][j].element;
                if (canGoUp(j)) {
                    matrix[i][j].element = undefined;
                    let upperElement = j - 1;
                    while (matrix[i][upperElement].element == undefined) {
                        matrix[i][upperElement].element = element;
                        upperElement--;
                        if (upperElement == -1) {
                            break;
                        }
                    }
                }
            }
        }
    }
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