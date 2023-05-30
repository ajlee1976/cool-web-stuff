const words = Array.from(document.getElementsByClassName("word"));
const rows = Array.from(document.getElementsByClassName("row"));
var mouseX = 0;
var mouseY = 0;
var state = false;
var createdLetters = []

function between(number, min, max) {
    return number >= min && number <= max
}

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function lettersToText() {
    let newText = ""
    createdLetters.forEach(letter => {
        newText += letter.innerText;
    });
    return newText
}

onMouseHover = (event) => {
    state = true;
    let letters = event.target.innerText.split("");
    event.target.innerText = ""

    const outer = document.createElement("span")
    outer.className = "outer"

    event.target.appendChild(outer)
    letters.forEach((value) => {
        const letter = document.createElement("span");
        letter.className = "letter"
        letter.innerHTML = value
        
        let translate = `translate(${random(-25, 25)}%, ${random(-75, 75)}%) rotate(${random(-10, 10)}deg)`

        outer.appendChild(letter);
        letter.style.transitionDuration = "750ms"
        letter.style.animation = "linear"
        requestAnimationFrame(() => {
            letter.style.transform = translate
        })
        createdLetters.push(letter);
    });
    

    words.forEach(word => {
        word.style.fontSize = "var(--font-size-big)";
        if (word != event.target) {
            word.style.opacity = 0.1;
            word.style.transitionDuration = "400ms";
        }
    });
}

onMouseExit = (event) => {
    if (event.target != document.body) {
        event.target.innerText = lettersToText();
        createdLetters = []
    }
    words.forEach(word => {
        word.style.opacity = 1;
        word.style.transitionDuration = "1";
        if (!(between(event.clientX, mouseX - 10, mouseX + 10) || between(event.clientY, mouseY - 10, mouseY + 10))){ 
            word.style.fontSize = null;
            state = false;
        }
    });
}

onMouseMove = (event) => {
    if (event.target == document.body){
        onMouseExit(event)
    }
}

words.forEach(element => {
    if (element.className.includes("fancy")) {
        element.addEventListener("mouseover", onMouseHover);
        element.addEventListener("mouseout", onMouseExit);
    }
    document.onmousemove = onMouseMove;
});

