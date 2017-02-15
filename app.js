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

function saveCards() {
    //todo: use fs to save to cards.txt
}

//todo: determine way to gather card data
function mainMenu() {
    //todo: show how many cards the user has created/loaded
    //new cards, total cards

    //todo: use inquirer to prompt the user for what they want to do
    //todo: create a card - calls createCard();
    //todo: save cards - appends all current cards to cards.txt as json object
    //todo: load cards - loads all cards from cards.txt
    //todo: view cards - shows a list of all cards and lets the user pick one to view
    //todo: exit app - exit the application
}

// todo: prompt for which type of card to create, call appropriate function
// todo: return to main menu when finished
function createCard() {

}

// create a BasicFlashCard
// todo: return to main menu when finished
function createBasicFlashCard() {

}

// create a ClozeFlashCard
// todo: return to main menu when finished
function createClozeFlashCard() {

}

//todo: append all NEW cards to cards.txt
// todo: return to main menu when finished
function saveCards() {

}

//todo: load all cards from cards.txt
// todo: return to main menu when finished
function loadCards() {

}

//todo: show user a list of cards, when one is selected, call viewCard
function viewCards() {

}

//todo: show the card front, prompt for input, then show answer
//todo: return to main menu when finished
function viewCard() {

}

//todo: exit the app
function exit() {

}