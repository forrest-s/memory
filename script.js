const deck = [
    'Ace ♡ ', '2 ♡ ', '3 ♡ ', '4 ♡ ', '5 ♡ ',
    '6 ♡ ', '7 ♡ ', '8 ♡ ', '9 ♡ ', '10 ♡ ',
    'Jack ♡ ', 'Queen ♡ ', 'King ♡ ',
    'Ace ♠', '2 ♠', '3 ♠', '4 ♠', '5 ♠',
    '6 ♠', '7 ♠', '8 ♠', '9 ♠', '10 ♠',
    'Jack ♠', 'Queen ♠', 'King ♠',
    // 'Ace ♢', '2 ♢', '3 ♢', '4 ♢', '5 ♢',
    // '6 ♢', '7 ♢', '8 ♢', '9 ♢', '10 ♢',
    // 'Jack ♢', 'Queen ♢', 'King ♢',
    // 'Ace ♣ ', '2 ♣ ', '3 ♣ ', '4 ♣ ', '5 ♣ ',
    // '6 ♣ ', '7 ♣ ', '8 ♣ ', '9 ♣ ', '10 ♣ ',
    // 'Jack ♣ ', 'Queen ♣ ', 'King ♣ ', 'Joker', 'Joker'
];
const symbols = [...deck]; 
let cards = [];
let flippedCards = [];
let moveCount = 0;
let checking = false; // Flag to indicate if the cards are being checked

const gameContainer = document.getElementById('game-container');
const startButton = document.getElementById('start-button');
const moveCounter = document.getElementById('move-counter');

// Shuffle the symbols array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Create card elements and add them to the game container
function createCards() {
    shuffleArray(symbols);
    cards = []; // Clear previous cards
    gameContainer.innerHTML = '';
    moveCount = 0;
    moveCounter.textContent = moveCount;

    for (const symbol of symbols) {
        const cardElement = document.createElement('div');
        cardElement.className = 'card';
        cardElement.dataset.symbol = symbol; // Store the symbol as a data attribute

        cardElement.addEventListener('click', () => flipCard(cardElement));
        gameContainer.appendChild(cardElement);
        cards.push(cardElement);
    }
}

// Event listener for card clicks
function flipCard(card) {
    if (!flippedCards.includes(card) && flippedCards.length < 2 && !checking) {
        card.classList.add('flipped');
        card.textContent = card.dataset.symbol; // Display the card's symbol

        flippedCards.push(card);

        if (flippedCards.length === 2) {
            moveCount++;
            moveCounter.textContent = moveCount;
            checking = true; // Set checking to true while cards are being checked
            checkMatch();
        }
    }
}

// Check if the two flipped cards match based on their values
function checkMatch() {
    const [card1, card2] = flippedCards;
    
    const value1 = card1.textContent.split(' ')[0]; // Get the value of the first card
    const value2 = card2.textContent.split(' ')[0]; // Get the value of the second card
    
    
    if (value1 === value2) {
        card1.classList.add('matched');
        card2.classList.add('matched');
    } else {
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            card1.textContent = ''; // Hide the value
            card2.textContent = ''; // Hide the value
        }, 500); // Delay before flipping back
    }

    flippedCards = [];
    checking = false; // reset flag

    if (document.querySelectorAll('.matched').length === symbols.length) {
        // setTimeout(() => alert('Congratulations! You won the game!'), 500);
        openModal(moveCounter.textContent, moveCount)
    }
}

// Start the game when the "Start Game" button is clicked
startButton.addEventListener('click', () => {
    createCards();
    startButton.disabled = true;
});


function openModal(matches, turns) {
    const modal = document.getElementById('win-modal');
    modal.style.display = 'block';

    // Display the number of matches and turns in the modal
    modal.querySelector('p:nth-of-type(1)').textContent = `You won with ${matches} matches.`;
    modal.querySelector('p:nth-of-type(2)').textContent = `It took you ${turns} turns.`;
}

// Function to close the modal
function closeModal() {
    const modal = document.getElementById('win-modal');
    modal.style.display = 'none';

    // Reset the game board and make the "Start Game" button active again
    resetGame();
}

// Function to reset the game board
function resetGame() {
    // Implement game reset logic here

    // Example: Clear the board and set up a new game
    // ...

    // Make the "Start Game" button active again
    const startButton = document.getElementById('start-button');
    startButton.disabled = false;
}