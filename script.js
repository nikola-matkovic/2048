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


const getRandomNumber = (numbers) => {
    let index = Math.floor(Math.random() * numbers.length);
    return numbers[index];
}

const createNewElement = () => {
    let number = getRandomNumber(avableNumbers);
    let colorIndex = Math.log2(number);
    let backgroundColor = colors[colorIndex];
    console.log(backgroundColor, colorIndex);
    let element = document.createElement("div");
    element.classList.add("number");
    element.style.backgroundColor = backgroundColor;
    element.textContent = number;
    cont.appendChild(element);
}

function start() {
    
}