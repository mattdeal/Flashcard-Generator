var ClozeFlashcard = function(text, cloze) {
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

module.exports = ClozeFlashcard;