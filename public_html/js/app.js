/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/*
 * Create a list that holds all of your cards
 */


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
let cards = ['bicycle', 'bicycle', 'leaf', 'leaf', 'cube', 'cube', 'anchor', 'anchor', 'paper-plane-o', 'paper-plane-o', 'bolt', 'bolt', 'bomb', 'bomb', 'diamond', 'diamond'];
let deck = document.getElementsByClassName("deck");
let opened = [];
const delayInMilliseconds = 500; //1 second
let timer = document.getElementsByClassName("timer");
let currentTimer;
let second = 0;
let moveNum = 0;
let move = document.getElementsByClassName("moves");
let stars = document.getElementsByClassName("stars");
let rate = 3;
let match = 0;
let rstart = document.getElementsByClassName("restart");
let startGame = false;

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

function init() {
    startGame = false;
    resetTimer(currentTimer);
    second = 0;
    timer[0].innerText = second;
    //  initTime();
    moveNum = 0;
    move[0].innerText = moveNum;
    rate = 3;
    for (let i = 0; i < 3; i++) {
        if (stars[0].children[i].children[0].classList.contains("fa-star-o")) {
            stars[0].children[i].children[0].classList.remove("fa-star-o");
            stars[0].children[i].children[0].classList.add("fa", "fa-star");
        }
    }
    match = 0;
    cards = shuffle(cards);
    var ulu = deck[0].children;
    moveNum = 0;
    for (var i = 0; i < cards.length; i++) {
        if (ulu[i].classList.contains("match"))
            ulu[i].classList.remove("match");
        if (ulu[i].classList.contains("open", "show"))
            ulu[i].classList.remove("open", "show");
        ulu[i].children[0].remove();
        var node = document.createElement("i");
        node.className = "fa fa-" + cards[i];
        ulu[i].appendChild(node);
    }
    deck[0].addEventListener("click", openCard);
    rstart[0].addEventListener("click", restart);
}

function openCard(event) {
    if (!startGame) {
        initTime();
        startGame = true;
    }
    if (event.target.classList.contains("match") || event.target.classList.contains("open", "show"))
        return true;
    if (event.target.tagName === "LI") {
        event.target.classList.add("open", "show");
        opened.push(event.target);
        setTimeout(function () {
            if (opened.length > 1) {
                if (opened[0].children[0].className === opened[1].children[0].className) {
                    opened[0].classList.add("match");
                    opened[1].classList.add("match");
                    if (++match === 8)
                        endGame();
                }
                opened[0].classList.remove("open", "show");
                opened[1].classList.remove("open", "show");
                opened.pop();
                opened.pop();
                move[0].innerText = ++moveNum;
                if (moveNum === 10 || moveNum === 20)
                    Rate();
            }
        }, delayInMilliseconds);
    }
}
//from http://stackoverflow.com with some modified
function initTime() {
    currentTimer = setInterval(function () {
        timer[0].innerText = second;
        second = second + 1;
    }, 1000);
}

function resetTimer(timer) {
    if (timer) {
        clearInterval(timer);
    }
}

function Rate() {
    stars[0].children[rate - 1].children[0].classList.remove("fa-star");
    stars[0].children[rate - 1].children[0].classList.add("fa", "fa-star-o");
    rate--;
}

function endGame() {
    resetTimer(currentTimer);
    swal({
        closeOnEsc: false,
        allowOutsideClick: false,
        title: 'Congratulations! You Won!',
        text: 'With ' + moveNum + ' Moves and ' + rate + ' Stars in ' + second + ' Seconds.\n Woooooo!',
        icon: 'success',
        button: 'Play again!'
    }).then(function (isConfirm) {
        if (isConfirm) {
            init();
        }
    })

}

function restart() {

    swal({
        closeOnEsc: false,
        allowOutsideClick: false,
        title: 'Are you sure?',
        text: "Your progress will be Lost!",
        icon: 'warning',
        buttons: [true, 'Yes, Restart Game!'],
    }).then(function (isConfirm) {
        if (isConfirm) {
            init();
        }
    })

}

init();
/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

