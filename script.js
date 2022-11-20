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

const GLOBAL_SPEEED = 250;
let avableNumbers = [2, 4];
let cont = document.getElementById("cont");
let score = 0;
let sizeX = 4;
let sizeY = 4;
let numberOfElements = 0;

let matrix = [];

const log_matrix = () => {
    for (let i = 0; i < 4; i++){
        console.log(`${matrix[i][0].number} \t ${matrix[i][1].number} \t ${matrix[i][2].number} \t ${matrix[i][3].number}`);
    }
    let numberOfElements_real = document.querySelectorAll(".number").length
    console.log(`now i have ${numberOfElements_real} elements, and i have ${numberOfElements} in memory`);
}

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
            matrix[i][j] = { number: 0, element: undefined, used : false};
        }
    }
}

const clearUsed = () => {
    for (let i = 0; i < sizeX; i++) {
        for (let j = 0; j < sizeY; j++) {
            matrix[i][j].used = false;
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
}

const createGrid = () => {
    for (let i = 0; i < sizeX * sizeY; i++){
        let cell = document.createElement("div");
        cell.classList.add("cell");
        cont.appendChild(cell);
    }
}

const start = () => {
    score = 0;
    getHighScore();
    createGrid();
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
    let isOver = checkGameOver();
    if (isOver){
        gameOver();
        return;
    }
    let element = createNewElement();
    setElementPosition(element);
    numberOfElements++;
}

const detectKey = (event) => {
    clearUsed();
    let key = event.key;
    switch (key) {
        case "ArrowUp":
            moveUp();
            break;
        case "ArrowDown":
            moveDown();
            break;
        case "ArrowLeft":
            moveLeft();
            break;
        case "ArrowRight":
            moveRight();
    }
}

const moveUp = () => {
    console.log("before");
    log_matrix();
    let speed;
    const move = (i, j) => {
        let steps = 0;
        let sum = false;
        number = matrix[i][j].number;
        element = matrix[i][j].element; 
        for (let k = i - 1; k >= 0; k--) {
            if (matrix[k][j].element == undefined) {
                steps++;
            }
            if (matrix[k][j].number == number) {
                steps++;
                sum = true;
                matrix[k][j].element.remove();
            }
            if (matrix[k][j].element != undefined && matrix[k][j].number != number) {
                break;
            }
        }
        if (steps) {
            let lastPosition;
            for (let k = 1; k <= steps; k++){
                matrix[i-k][j].element = element;
                matrix[i-k][j].number = number;
                matrix[i-k+1][j].element = undefined;
                matrix[i - k + 1][j].number = 0;
                lastPosition = i - k;
            }
            if (sum) {
                let element = matrix[lastPosition][j].element;
                let colorIndex = Math.log2(number * 2);
                let backgroundColor = colors[colorIndex];
                element.textContent = number * 2;
                element.style.backgroundColor = backgroundColor;
                matrix[lastPosition][j].number = number * 2;
                numberOfElements--;

                //fix bug for  3 in row
                matrix[lastPosition][j].used = true;
            }
            speed = steps * 0.25;
            element.style.transitionDuration = `${speed * GLOBAL_SPEEED}ms`
            element.style.top = `${lastPosition * 25}%`;
            element.style.top = `${lastPosition * 25}%`;
            console.log("I need to go " + steps + " steps")
        }
    }

    for (let i = 0; i < sizeY; i++){
        for (let j = 0; j < sizeX; j++){
            if (matrix[i][j].element != undefined) {
                move(i, j)
            }
        }
    }
    setTimeout(() => {
        addNew();
        console.log("after");
        log_matrix();
    }, speed * GLOBAL_SPEEED);
}

const moveDown = () => {
    console.log("before");
    log_matrix();
    let speed;
    const move = (i, j) => {
        let steps = 0;
        let sum = false;
        number = matrix[i][j].number;
        element = matrix[i][j].element; 
        for (let k = i + 1; k < sizeY; k++) {
            if (matrix[k][j].element == undefined) {
                steps++;
            }
            if (matrix[k][j].number == number) {
                steps++;
                sum = true;
                matrix[k][j].element.remove();
            }
            if (matrix[k][j].element != undefined && matrix[k][j].number != number) {
                break;
            }
        }
        if (steps) {
            let lastPosition;
            for (let k = 1; k <= steps; k++){
                matrix[i+k][j].element = element;
                matrix[i+k][j].number = number;
                matrix[i+k-1][j].element = undefined;
                matrix[i + k - 1][j].number = 0;
                lastPosition = i + k;
            }
            if (sum) {
                let element = matrix[lastPosition][j].element;
                let colorIndex = Math.log2(number * 2);
                let backgroundColor = colors[colorIndex];
                element.textContent = number * 2;
                element.style.backgroundColor = backgroundColor;
                matrix[lastPosition][j].number = number * 2;
                numberOfElements--;
            }
                speed = steps * 0.25;
                element.style.transitionDuration = `${speed * GLOBAL_SPEEED}ms`
                element.style.top = `${lastPosition * 25}%`;
                element.style.top = `${lastPosition * 25}%`;
            console.log("I need to go " + steps + " steps")
        }
    }

    for (let i = sizeY - 2; i >= 0; i--){
        for (let j = 0; j < sizeX; j++){
            if (matrix[i][j].element != undefined) {
                move(i, j)
            }
        }
    }

    setTimeout(() => {
        addNew();
        console.log("after");
        log_matrix();
    }, speed * GLOBAL_SPEEED);
}

const moveLeft = () => {
    console.log("before");
    log_matrix();
    let speed;
    let forDelete = null;
    const move = (i, j) => {
        let steps = 0;
        let sum = false;
        let number = matrix[i][j].number;
        let element = matrix[i][j].element;
        for (let k = j - 1; k >= 0; k--) {
            if (matrix[i][k].element == undefined) {
                steps++;
            }
            if (matrix[i][k].number == number) {
                steps++;;
                sum = true;
                matrix[i][k].element.remove();
            }
            if (matrix[i][k].element != undefined && matrix[i][k].number != number) {
                break
            }
        }
        if (steps) {
            let lastPosition;
            for (let k = 1; k <= steps; k++) {
                matrix[i][j - k].element = element;
                matrix[i][j - k].number = number;
                matrix[i][j - k + 1].element = undefined;
                matrix[i][j - k + 1].number = 0;
                lastPosition = j - k;
            }
            if (sum) {
                let element = matrix[i][lastPosition].element;
                let colorIndex = Math.log2(number * 2);
                let backgroundColor = colors[colorIndex];
                element.textContent = number * 2;
                element.style.backgroundColor = backgroundColor;
                matrix[i][lastPosition].number = number * 2;
                numberOfElements--;
            }
            speed = steps * 0.25;
            element.style.transitionDuration = `${speed * GLOBAL_SPEEED}ms`
            element.style.left = `${lastPosition * 25}%`;
            console.log("I need to go " + steps + " steps")
        }
    }
    for (let j = 0; j < sizeX; j++){
        for (let i = 0; i < sizeX; i++){
            if (matrix[i][j].element != undefined) {
                move(i, j);
            }
        }
    }

    setTimeout(() => {
        addNew();
        console.log("after");
        log_matrix();
    }, speed * GLOBAL_SPEEED)
}

const moveRight = () => {
    console.log("before");
    log_matrix();
    let speed;
    const move = (i, j) => {
        let steps = 0;
        let sum = false;
        let number = matrix[i][j].number;
        let element = matrix[i][j].element;
        for (let k = j + 1; k < sizeY; k++) {
            if (matrix[i][k].element == undefined) {
                steps++;
            }
            if (matrix[i][k].number == number) {
                steps++;;
                sum = true;
                matrix[i][k].element.remove();
            }
            if (matrix[i][k].element != undefined && matrix[i][k].number != number) {
                break
            }
        }
        if (steps) {
            let lastPosition;
            for (let k = 1; k <= steps; k++) {
                matrix[i][j + k].element = element;
                matrix[i][j + k].number = number;
                matrix[i][j + k - 1].element = undefined;
                matrix[i][j + k - 1].number = 0;
                lastPosition = j + k;
            }
            if (sum) {
                let element = matrix[i][lastPosition].element;
                let colorIndex = Math.log2(number * 2);
                let backgroundColor = colors[colorIndex];
                element.textContent = number * 2;
                element.style.backgroundColor = backgroundColor;
                matrix[i][lastPosition].number = number * 2;
                numberOfElements--;
            }
            speed = steps * 0.25;
            element.style.transitionDuration = `${speed * GLOBAL_SPEEED}ms`
            element.style.left = `${lastPosition * 25}%`;
            console.log("I need to go " + steps + " steps")
        }
    }
    for (let j = sizeX - 2; j >= 0; j--){
        for (let i = 0; i < sizeX; i++){
            if (matrix[i][j].element != undefined) {
                move(i, j);
            }
        }
    }

    setTimeout(() => {
        addNew();
        console.log("after");
        log_matrix();
    }, speed * GLOBAL_SPEEED)
}
//event listeners:
addEventListener("load", start)
addEventListener("keyup", (event) => detectKey(event))