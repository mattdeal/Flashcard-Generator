//todo: move to BasicFlashcard.js
function BasicFlashcard(front, back) {
    this.front = front;
    this.back = back;    
}

BasicFlashcard.prototype.showFront = function() {
    console.log(this.front);
}

BasicFlashcard.prototype.showBack = function() {
    console.log(this.back);
}

//todo: move to ClozeFlashcard.js
function ClozeFlashcard(text, cloze) {
    this.text = text;
    this.cloze = cloze;
    this.displayCloze = false;    
}

ClozeFlashcard.prototype.showText = function() {
    if (this.displayCloze) {
        console.log(this.text.replace('_', this.cloze));
    } else {
        console.log(this.text);
    }
}

ClozeFlashcard.prototype.showAnswer = function() {
    this.displayCloze = true;
    this.showText();
}

//todo: require flashcard classes
var fs = require('fs');
var inquirer = require('inquirer');

// all cards created this session
var newCards = [];

// all cards in this session and any cards loaded from file
var allCards = [];

//todo: determine way to gather card data
function mainMenu() {
    console.log('You have ' + newCards.length ' new Flashcards');
    console.log('There are ' + allCards.length ' Flashcards available');
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
                createFlascard();
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
                //todo: exit
                break;
        }

    });
}

// todo: prompt for which type of card to create, call appropriate function
// todo: return to main menu when finished
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
// todo: return to main menu when finished
function createBasicFlashCard() {
    // todo: validate that there are entries for front and back
    // todo: add card to newCards and allCards
}

// create a ClozeFlashCard
// todo: return to main menu when finished
function createClozeFlashCard() {
    // todo: validate that there are entries for text and cloze AND that text includes '_'
    // todo: add card to newCards and allCards
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
    });

    // return to main menu
    mainMenu();
}

//todo: load all cards from cards.txt
// todo: return to main menu when finished
function loadFlashCards() {

    // return to main menu
    mainMenu();
}

//todo: show user a list of cards, when one is selected, call viewCard
function viewFlashCards() {

    // return to main menu
    mainMenu();
}

//todo: show the card front, prompt for input, then show answer
//todo: return to main menu when finished
function viewFlashCard() {

    // return to main menu
    mainMenu();
}

//todo: exit the app
function exit() {

}