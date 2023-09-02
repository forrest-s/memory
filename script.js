const deck = [
    'Ace ♡ ', '2 ♡ ', '3 ♡ ', '4 ♡ ', '5 ♡ ',
    '6 ♡ ', '7 ♡ ', '8 ♡ ', '9 ♡ ', '10 ♡ ',
    'Jack ♡ ', 'Queen ♡ ', 'King ♡ ',
    'Ace ♠', '2 ♠', '3 ♠', '4 ♠', '5 ♠',
    '6 ♠', '7 ♠', '8 ♠', '9 ♠', '10 ♠',
    'Jack ♠', 'Queen ♠', 'King ♠',
    'Ace ♢', '2 ♢', '3 ♢', '4 ♢', '5 ♢',
    '6 ♢', '7 ♢', '8 ♢', '9 ♢', '10 ♢',
    'Jack ♢', 'Queen ♢', 'King ♢',
    'Ace ♣ ', '2 ♣ ', '3 ♣ ', '4 ♣ ', '5 ♣ ',
    '6 ♣ ', '7 ♣ ', '8 ♣ ', '9 ♣ ', '10 ♣ ',
    'Jack ♣ ', 'Queen ♣ ', 'King ♣ ', 'Joker', 'Joker'
];
let cards = [];
let flippedCards = [];
let moveCount = 0;
let checking = false; // Flag to indicate if the cards are being checked
const players = ['Player One']; // Add as many players as needed

const gameContainer = document.getElementById('game-container');
const startButton = document.getElementById('start-button');
const moveCounter = document.getElementById('move-counter');
const winDialog = document.getElementById('win-dialog');
const matchesCount = document.getElementById('matches-count');
const turnsCount = document.getElementById('turns-count');
const winnerName = document.getElementById('winner-name')
const totalPlayers = document.getElementById('num-players');
const currentPlayerLabel = document.getElementById('current-player-label')
const scoreboard = document.getElementById('scoreboard')
const resetButton = document.getElementById('reset-game')

resetButton.addEventListener('click', () => resetGame())

// Start the game when the "Start Game" button is clicked
startButton.addEventListener('click', () => {
    createCards();
    currentPlayerLabel.textContent = players[0]
    if (totalPlayers.value === '2') players.push('Player Two')
    if (totalPlayers.value === '3') players.push('Player Two', 'Player Three')
    if (totalPlayers.value === '4') players.push('Player Two', 'Player Three', 'Player Four')
    for (const player of players) {
        const playerMatches = document.createElement('div')
        playerMatches.textContent = `${player} total matches: `
        const playerMatchesTotal = document.createElement('span')
        playerMatchesTotal.setAttribute('id', player)
        playerMatchesTotal.textContent = 0
        playerMatches.append(playerMatchesTotal)
        scoreboard.append(playerMatches)
    }
    startButton.style.display = 'none';
    resetButton.style.display = 'block'
});

// Shuffle the deck array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Create card elements and add them to the game container
function createCards() {
    shuffleArray(deck);
    cards = []; // Clear previous cards
    moveCount = 0;
    moveCounter.textContent = moveCount;

    for (const card of deck) {
        const cardElement = document.createElement('div');
        cardElement.className = 'card';
        cardElement.dataset.card = card; // Store the card as a data attribute
        cardElement.addEventListener('click', () => handleCardClick(cardElement));
        gameContainer.appendChild(cardElement);
        cards.push(cardElement);
    }
}

// Check if the two flipped cards match based on their values
function checkMatch() {
    const [card1, card2] = flippedCards;
    
    const value1 = card1.textContent.split(' ')[0]; // Get the value of the first card
    const value2 = card2.textContent.split(' ')[0]; // Get the value of the second card
    let matched = false
    
    if (value1 === value2) {
        const playerNumber = currentPlayerLabel.textContent.split('')
        playerNumber.splice(6, 1) // remove space
        card1.classList.add('matched');
        card1.setAttribute('id', playerNumber.join(''))
        card2.classList.add('matched');
        card2.setAttribute('id', playerNumber.join(''))
        matched = true
    } else {
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            card1.textContent = ''; // Hide the value
            card2.textContent = ''; // Hide the value
        }, 230); // Delay before flipping back
    }

    flippedCards = [];
    checking = false; // reset flag

    return matched
}

// Function to reset the game board
function resetGame() {
    // Implement game reset logic here
    moveCount = 0
    moveCounter.textContent = moveCount
    cards = []
    while (gameContainer.firstChild) {
        gameContainer.removeChild(gameContainer.firstChild)
    }
    while (scoreboard.firstChild) {
        scoreboard.removeChild(scoreboard.firstChild)
    }
    currentPlayerLabel.textContent = ''
    totalPlayers.value = 1
    players.splice(1)
    // Make the "Start Game" button active again
    startButton.style.display = 'block';
    resetButton.style.display = 'none'
}

// Attach an event listener to the close button
const closeButton = document.getElementById('close-dialog-button');
closeButton.addEventListener('click', closeDialog);

function switchToNextPlayer() {
    if (players.length === 1) return
    else if (players.length === 2) {
        if (currentPlayerLabel.textContent === 'Player One') return currentPlayerLabel.textContent = players[1]
        if (currentPlayerLabel.textContent === 'Player Two') return currentPlayerLabel.textContent = players[0]
    } else if (players.length === 3) {
        if (currentPlayerLabel.textContent === 'Player One') return currentPlayerLabel.textContent = players[1]
        if (currentPlayerLabel.textContent === 'Player Two') return currentPlayerLabel.textContent = players[2]
        if (currentPlayerLabel.textContent === 'Player Three') return currentPlayerLabel.textContent = players[0]
    } else if (players.length === 4) {
        if (currentPlayerLabel.textContent === 'Player One') return currentPlayerLabel.textContent = players[1]
        if (currentPlayerLabel.textContent === 'Player Two') return currentPlayerLabel.textContent = players[2]
        if (currentPlayerLabel.textContent === 'Player Three') return currentPlayerLabel.textContent = players[3]
        if (currentPlayerLabel.textContent === 'Player Four') return currentPlayerLabel.textContent = players[0]
    }
}

function handleCardClick(card) {
    if (!flippedCards.includes(card) && flippedCards.length < 2 && !checking) {
        card.classList.add('flipped');
        card.textContent = card.dataset.card; // Display the card's card

        flippedCards.push(card);

        if (flippedCards.length === 2) {
            moveCount++;
            moveCounter.textContent = moveCount;
            checking = true; // Set checking to true while cards are being checked
            let isMatch = checkMatch();
            if (isMatch) {
                const matchTotal = document.getElementById(currentPlayerLabel.textContent)
                matchTotal.textContent++
                if (document.querySelectorAll('.matched').length === deck.length) return displayWinner()
            } else {
                // Switch to the next player's turn
                switchToNextPlayer();
            }
        }
    }
}

function displayWinner() {
    if (players.length === 1) {
        const totalMatches = document.getElementById(currentPlayerLabel.textContent)
        openDialog(totalMatches.textContent, moveCount, players[0])
        return 
    } 
    // get the high score
    const allScores = scoreboard.querySelectorAll('span')
    let maxScore = 0
    for (score of allScores) {
        if (~~score.textContent > maxScore) maxScore = ~~score.textContent
    }
    // check for duplicates
    let winners = []
    for (const [index, value] of allScores.entries()) {
        if (~~value.textContent === maxScore) winners.push(value.id)
    }

    if (winners.length > 1) return openDialog(maxScore, moveCount, winners.join(', '))

    return openDialog(maxScore, moveCount, winners[0])
}

// Function to open the modal when the game is won
function openDialog(matches, turns, winner) {
    matchesCount.textContent = matches;
    turnsCount.textContent = turns;
    winnerName.textContent = winner;
    winDialog.showModal();
}

// Function to close the modal
function closeDialog() {
    winDialog.close();
    resetGame();
}
