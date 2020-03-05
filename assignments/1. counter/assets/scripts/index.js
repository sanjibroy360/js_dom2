let counter = 0;

// Select Display Area
let display = document.querySelector(".screen");

// Select Buttons

let inc = document.querySelector(".inc");
let dec = document.querySelector(".dec");
let reset = document.querySelector(".reset");

// Add Event 
inc.addEventListener("click", plusOne);
dec.addEventListener("click", minusOne);
reset.addEventListener("click", resetFn);

// Manupulate


function plusOne() {
    counter++;
    displayAnswer(counter);
}

function minusOne() {
    counter--;
    displayAnswer(counter);
}

function resetFn() {
    counter = 0;
    displayAnswer(counter);
}

function displayAnswer(val) {
    if(val < 0) {
        counter = 0;
    }
    display.textContent = counter;
}