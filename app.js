function BasicFlashcard(front, back) {
    this.front = front;
    this.back = back;

    this.showFront = function() {
        console.log(this.front);
    }

    this.showBack = function() {
        console.log(this.back);
    }
}

function ClozeFlashcard(text, cloze) {
    this.text = text;
    this.cloze = cloze;
    this.displayCloze = false;

    this.showText = function() {
        if (this.displayCloze) {
            console.log(this.text.replace('_', this.cloze));
        } else {
            console.log(this.text);
        }
    }

    this.showAnswer = function() {
        this.displayCloze = true;
        this.showText();
    }
}

function saveCards() {
    //todo: use fs to save to cards.txt
}

//todo: determine way to gather card data
// use inquirer to prompt for card type and then get fields
// use commandline args card-type, arg1, arg2