let simpleNumberJSON = {
    "yksi": 1,
    "kaksi": 2,
    "kolme": 3, 
    "nelja": 4, 
    "viisi": 5, 
    "kuusi": 6, 
    'kahdeksankymmentakahdeksyan': 88, 
    'kymmenen': 10, 
}

let dataJSON = undefined;

let getData = function() {
    dataJSON = simpleNumberJSON;
}

let firstSelected, secondSelected;

let setSelected = function (element) {
    if (firstSelected == undefined) {
        firstSelected = element;
        firstSelected.style.backgroundColor = 'pink';
    } else if (secondSelected == undefined && firstSelected == element) {
        firstSelected.style.backgroundColor = 'white';
        firstSelected = undefined;
    } else if (secondSelected == undefined) {
        secondSelected = element;
        secondSelected.style.backgroundColor = 'pink';
    } 
}

//functions to mark numbers as matched or unmatched after user selection

let matchedList = document.querySelector('.matched-list');

let callMatch = function (keyElement) {
    const matchedElement = document.createElement("li");
    const matchedText = document.createTextNode(`
    ${keyElement.innerText} = ${dataJSON[keyElement.innerText]}`);
    matchedElement.appendChild(matchedText);
    matchedList.appendChild(matchedElement);
    firstSelected.style.backgroundColor = 'green';
    secondSelected.style.backgroundColor = 'green';
    if(keyElement == firstSelected) {
        keyList.removeChild(firstSelected);
        valueList.removeChild(secondSelected);
    } else {
        keyList.removeChild(secondSelected);
        valueList.removeChild(firstSelected);
    }
}

let callUnMatch = function () {
    firstSelected.style.backgroundColor = 'white';
    secondSelected.style.backgroundColor = 'white';
}

let keyList = document.querySelector('.key-list');
let valueList = document.querySelector('.value-list');
let keys = keyList.children;
let values = valueList.children;

//remove children from given list
let cleanList = function(listName) {
    for (let i=listName.childElementCount-1; i>=0; i--) {
        listName.removeChild(listName.children.item(i));
    }
}

let compareSelected = function() {
    if(firstSelected.classList.contains('key-list__element')) {
        if(dataJSON[firstSelected.innerText] == secondSelected.innerText) {
            callMatch(firstSelected);
        } else {
            callUnMatch();
        }
    } else {
        if(firstSelected.innerText == dataJSON[secondSelected.innerText]) {
            callMatch(secondSelected);
        } else {
            callUnMatch();
        }
    }
    firstSelected = undefined;
    secondSelected = undefined;
}

let startGame = function () {
    getData();
    //creating elements lists as html objects
    for (let key in dataJSON) {
        const keyElement = document.createElement("li");
        const keyContent = document.createTextNode(key);
        keyElement.classList.add('key-list__element');
        keyElement.classList.add('numbers-list__element');
        keyElement.appendChild(keyContent);
        keyList.appendChild(keyElement);

        const valueElement = document.createElement("li");
        const valueContent = document.createTextNode(dataJSON[key]);
        valueElement.classList.add('value-list__element');
        valueElement.classList.add('numbers-list__element');
        valueElement.appendChild(valueContent);
        valueList.appendChild(valueElement);
    }

    //shuffling numbers in lists
    for (let i = keys.length; i >= 0; i--) {
        keyList.appendChild(keyList.children[Math.random() * i | 0]);
    }

    for (let i = values.length; i >= 0; i--) {
        valueList.appendChild(valueList.children[Math.random() * i | 0])
    }

    //adding eventListeners to numbers to interact with user

    let keyElementsList = document.querySelectorAll('.numbers-list__element');

    for (let i = 0; i < keyElementsList.length; i++) {
        let thisElement = keyElementsList.item(i);
        thisElement.addEventListener('click', () => {
            if (firstSelected == undefined && secondSelected == undefined) {
                setSelected(thisElement);
            } else {
                setSelected(thisElement);
                compareSelected();
            }
        })    
    }
}

let startGameButton = document.querySelector('.start-game-button');

startGameButton.onclick = function(evt) {
    evt.preventDefault();

    firstSelected = undefined;
    secondSelected = undefined;

    cleanList(matchedList);
    cleanList(keyList);
    cleanList(valueList);

    startGame();
}

//first start of the game after opening the page
startGame();