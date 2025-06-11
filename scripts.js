const results = document.getElementById("results");
const numberSorted = document.getElementById("cont-number-sorted");
const configureOptions = document.getElementById("configure-options");
const quantitySorted = document.getElementById("quantity-sorted");
const initialNumberSorted = document.getElementById("initial-number-sorted");
const finalNumberSorted = document.getElementById("final-number-sorted");
const btSortedAgain = document.getElementById("bt-sorted-again");
const form = document.querySelector("form");
const selectMode = document.getElementById("select-mode");
const groupDrawnNumbers = document.getElementById("group-drawn-numbers");
const gradientAgain = document.querySelector("#results .button-gradient")
const logo = document.querySelector("header img")

const timeOut = 5000;
let countResults = 0;

let drawnList = []

form.onsubmit = (event) => {
    try{
        event.preventDefault();
        validation();
    
        configureOptions.classList.add("display-none");
        results.classList.remove("display-none");
        results.classList.remove("opacity-0");
        results.classList.add("opacity-1");

        createNumbers();
    }
    catch (error){
        alert(error);
    }
}

// logo.addEventListener("click", () => {
//     results.classList.add("display-none");
//     gradientAgain.classList.add("opacity-0");
//     configureOptions.classList.remove("display-none");

//     groupDrawnNumbers.innerHTML = "";
// });

btSortedAgain.addEventListener("click", () => {
    // results.classList.add("display-none");
    gradientAgain.classList.add("opacity-0");

    drawnList = [];
    groupDrawnNumbers.innerHTML = "";
    createNumbers();
});

quantitySorted.oninput = () => {
    quantitySorted.value = valueValidation(quantitySorted.value);
}

initialNumberSorted.oninput = () => {
    initialNumberSorted.value = valueValidation(initialNumberSorted.value);
}

finalNumberSorted.oninput = () => {
    finalNumberSorted.value = valueValidation(finalNumberSorted.value);
}

function sortedNumbers(values) {
    let i = 0;
    let time = 0;
    
    while (i < values.qtdParaSortear) {
        i++;

        setTimeout(() => {
            let numberDraw = getRandomInt(values.desseNumero, values.ateEsseNumero);

            if (selectMode.checked){
                while(drawnList.includes(numberDraw)){
                    numberDraw = getRandomInt(values.desseNumero, values.ateEsseNumero);
                }
                drawnList.push(numberDraw);
            }

            createNumbersForRandom(numberDraw);
        },time);

        time += timeOut;
    }
}

function valueValidation(value) {
    let valueTransform = value.replace(/\D/g, "");

    return valueTransform;
}

function validation() {
    let qtdParaSortear = Number(quantitySorted.value);
    let numeroInicial = Number(initialNumberSorted.value);
    let numeroFinal = Number(finalNumberSorted.value);

    if (qtdParaSortear <= 0){
        throw Error("Quantidade de numeros sorteados deve ser maior que Zero!");
    }

    if ((numeroFinal - numeroInicial) < 0) {
        throw Error("Numero inicial deve ser menor ou igual ao numero final para sorteio!");
    }

    if (selectMode.checked && qtdParaSortear > (numeroFinal - numeroInicial + 1)){
        throw Error("Quantidade de numeros sorteados deve ser maior ou igual ao intervalo entre o numero inicial e final!");
    }
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function createNumbersForRandom(value) {
    const drawnNumber = document.createElement("div");
    drawnNumber.classList.add("drawn-number");
    const insideNumber = document.createElement("div");
    insideNumber.classList.add("inside-number");

    insideNumber.textContent = value;
    drawnNumber.appendChild(insideNumber);
    groupDrawnNumbers.appendChild(drawnNumber);
}

function createNumbers() {
    countResults++;
    numberSorted.textContent = `${countResults}º RESULTADO`; 
    const valuesForSorted = {
            id: new Date().getTime(),
            qtdParaSortear: Number(quantitySorted.value),
            desseNumero: Number(initialNumberSorted.value),
            ateEsseNumero: Number(finalNumberSorted.value)
        }

        sortedNumbers(valuesForSorted);

        setTimeout(() => {
            gradientAgain.classList.remove("opacity-0");
        }, timeOut * Number(quantitySorted.value))
}