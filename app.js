var BasicFlashcard = require('./BasicFlashcard.js');
var ClozeFlashcard = require('./ClozeFlashcard.js');
var fs = require('fs');
var inquirer = require('inquirer');

// all cards created this session
var newCards = [];

// all cards in this session and any cards loaded from file
var allCards = [];

// main menu - chose an action
function mainMenu() {
    console.log('You have ' + newCards.length + ' new Flashcards');
    console.log('There are ' + allCards.length + ' Flashcards available');
    console.log('---------------------------------');

    inquirer.prompt([
        {
            type: "list",
            message: "What would you like to do?",
            choices: ["Create a Flashcard", "Save Flashcards", "Load Flashcards", "View Flashcards", "Exit"],
            name: "action"
        }
    ]).then(function (answer) {
        switch (answer.action) {
            case "Create a Flashcard":
                createFlashCard();
                break;
            case "Save Flashcards":
                saveFlashCards();
                break;
            case "Load Flashcards":
                loadFlashCards();
                break;
            case "View Flashcards":
                viewFlashCards();
                break;
            default:
                // exit app
                break;
        }

    });
}

// prompt for which type of card to create, call appropriate function
function createFlashCard() {
    inquirer.prompt([
        {
            type: "list",
            message: "What type of Flashcard would you like to make?",
            choices: ["Basic", "Cloze"],
            name: "cardType"
        }
    ]).then(function(answer) {
        if (answer.cardType === 'Basic') {
            createBasicFlashCard();
        } else {
            createClozeFlashCard();
        }
    });
}

// create a BasicFlashCard
function createBasicFlashCard() {
    inquirer.prompt([
        {
            type: "input",
            message: "Enter front text",
            name: "front",
            validate: function(str) {
                return (str !== null && str.length > 0);
            }
        },
        {
            type: "input",
            message: "Enter back text",
            name: "back",
            validate: function(str) {
                return (str !== null && str.length > 0);
            }
        }
    ]).then(function(answers) {
        var basicCard = new BasicFlashcard(answers.front, answers.back);
        newCards.push(basicCard);
        allCards.push(basicCard); 

        mainMenu();       
    });
}

// create a ClozeFlashCard
function createClozeFlashCard() {
    inquirer.prompt([
        {
            type: "input",
            message: "Enter text.  Use _ to indicate the blank that needs to be filled.",
            name: "text",
            validate: function(str) {
                return (str !== null && str.length > 0 && str.indexOf('_') > -1);
            }
        },
        {
            type: "input",
            message: "Enter cloze text",
            name: "cloze",
            validate: function(str) {
                return (str !== null && str.length > 0);
            }
        }
    ]).then(function(answers) {
        var clozeCard = new ClozeFlashcard(answers.text, answers.cloze);
        newCards.push(clozeCard);
        allCards.push(clozeCard); 

        mainMenu();       
    });
}

// save all newCards to file, clear newCards so we don't save a card twice
function saveFlashCards() {
    var cardString = '';
    for (var i = 0; i < newCards.length; i++) {
        cardString += JSON.stringify(newCards[i]) + '\r\n';
    }

    fs.appendFile('cards.txt', cardString, function(error) {
        if (error) {
            console.log(err);
        } else {
            newCards = [];
            console.log('Cards Saved!');
        }  

         // return to main menu
        mainMenu();      
    });
}

// load all cards from cards.txt
function loadFlashCards() {
    fs.readFile('cards.txt', 'utf8', function (err, data) {
        if (err) throw err;

        allCards = [];
        var dataArr = data.split('\r\n');

        for (var i in dataArr) {
            // console.log('*' + dataArr[i] + '*');
            if (dataArr[i] !== '') {
                var card = JSON.parse(dataArr[i]);
                if (card.front) {
                    allCards.push(new BasicFlashcard(card.front, card.back));
                } else {
                    allCards.push(new ClozeFlashcard(card.text, card.cloze));
                }
            }
        }

        // console.log(allCards);

        mainMenu();
    });
}

//todo: show user a list of cards, when one is selected, call viewCard
function viewFlashCards() {
    var questions = [];
    for (var i in allCards) {
        if (allCards[i].front) {
            questions.push(allCards[i].front);
        } else {
            questions.push(allCards[i].text);
        }
    }

    inquirer.prompt([
        {
            type: "list",
            message: "Select a card",
            choices: questions,
            name: "cardText"
        }
    ]).then(function(answers) {
        for (var i in allCards) {
            if (answers.cardText && allCards[i].front && answers.cardText === allCards[i].front) {
                viewFlashCard(allCards[i]);
            } else if (answers.cardText && allCards[i].text && answers.cardText === allCards[i].text) {
                viewFlashCard(allCards[i]);
            }
        }
    });
}

//todo: show the card front, prompt for input, then show answer
//todo: return to main menu when finished
function viewFlashCard(card) {
    var text, answer;

    if (card.front) {
        text = card.front;
        answer = card.back;
    } else {
        text = card.text;
        answer = card.cloze;
    }

    inquirer.prompt([
        {
            type: 'input',
            message: text,
            name: 'userAnswer',
            validate: function(str) {
                return (str !== null && str.length > 0);
            }
        }
    ]).then(function(answers) {
        if (answers.userAnswer === answer) {
            console.log('CORRECT!');
        } else {
            console.log('WRONG!');
        }

        if (card.front) {
            console.log(card.front + ' - ' + card.back);
        } else {
            card.showAnswer();
        }

        console.log('---------------------------------');
        
        // return to main mainMenu
        mainMenu();
    });
}

// start app on main menu
mainMenu();