let simpleNumberJSON = {
    "yksi": 1,
    "kaksi": 2,
    "kolme": 3, 
    "nelja": 4, 
    "viisi": 5, 
    "kuusi": 6
}

let dataJSON = simpleNumberJSON;

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

//creating elements lists as html objects

let keyList = document.querySelector('.key-list');
let valueList = document.querySelector('.value-list');

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

let keys = keyList.children;
let values = valueList.children;

for (let i = keys.length; i >= 0; i--) {
    keyList.appendChild(keyList.children[Math.random() * i | 0]);
}

for (let i = values.length; i >= 0; i--) {
    valueList.appendChild(valueList.children[Math.random() * i | 0])
}

//functions to mark numbers as matched or unmatched after user selection

let matchedList = document.querySelector('.matched-list');

let callMatch = function (keyElement) {
    console.log('Bingo!');
    console.log(keyElement.innerText);
    console.log(dataJSON[keyElement.innerText]);
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
    console.log('her');
    firstSelected.style.backgroundColor = 'white';
    secondSelected.style.backgroundColor = 'white';
}

//adding eventListeners to numbers to interact with user

let keyElementsList = document.querySelectorAll('.numbers-list__element');

for (let i = 0; i < keyElementsList.length; i++) {
    let thisElement = keyElementsList.item(i);
    thisElement.addEventListener('click', () => {
        if (firstSelected == undefined || secondSelected == undefined) {
            setSelected(thisElement);
        } else {
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
        
    })    
}