var BasicFlashcard = function(front, back) {
    this.front = front;
    this.back = back;    
}

BasicFlashcard.prototype.showFront = function() {
    console.log(this.front);
}

BasicFlashcard.prototype.showBack = function() {
    console.log(this.back);
}

module.exports = BasicFlashcard;