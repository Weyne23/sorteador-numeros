const results = document.getElementById("results");
const configureOptions = document.getElementById("configure-options");
const quantitySorted = document.getElementById("quantity-sorted");
const initialNumberSorted = document.getElementById("initial-number-sorted");
const finalNumberSorted = document.getElementById("final-number-sorted");
const btSortedAgain = document.getElementById("bt-sorted-again");
const form = document.querySelector("form");
const selectMode = document.getElementById("selectMode");
const groupDrawnNumbers = document.getElementById("group-drawn-numbers");

form.onsubmit = (event) => {
    try{
        event.preventDefault();
        validation();
    
        configureOptions.classList.add("display-none");
        results.classList.remove("display-none");
        results.classList.remove("opacity-0");
        results.classList.add("opacity-1");

        const valuesForSorted = {
            id: new Date().getTime(),
            qtdParaSortear: Number(quantitySorted.value),
            desseNumero: Number(initialNumberSorted.value),
            ateEsseNumero: Number(finalNumberSorted.value)
        }

        sortedNumbers(valuesForSorted);

        btSortedAgain.classList.remove("opacity-0");
        btSortedAgain.classList.add("opacity-1");

    }
    catch (error){
        alert(error);
    }
}

btSortedAgain.addEventListener("click", () => {
    results.classList.add("display-none");
    results.classList.remove("opacity-1");
    results.classList.add("opacity-0");
    configureOptions.classList.remove("display-none");
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

    do {
        i++;
        setTimeout(() => {
            createNumbersForRandom(getRandomInt(values.desseNumero, values.ateEsseNumero));
        },4000);
    } while (i < values.qtdParaSortear);
}

function valueValidation(value) {
    let valueTransform = value.replace(/\D/g, "");

    return valueTransform;
}

function validation() {
    let qtdParaSortear = Number(quantitySorted.value);

    if(qtdParaSortear <= 0){
        throw Error("Quantidade de numeros sorteados deve ser maior que Zero!");
    }
}

function getRandomInt(min, max) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
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