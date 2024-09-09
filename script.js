// Initialize game state
const gameState = {
    players: [
        { name: 'Player 1', hand: [], points: 0 },
        { name: 'Player 2', hand: [], points: 0 }
    ],
    currentTurn: 0,  // Index of the player whose turn it is
    deck: [],
    drawPile: [],
    discardPile: [],
    stageDeck: [],
    selectedStageCard: null
};

// Function to initialize the idol deck
function initializeDeck() {
    gameState.deck = [
        { id: 1, name: 'Jackson Wang', image: 'jackson.png', effect: 'someEffect' },
        { id: 5, name: 'Youngjae', image: 'youngjae.png', effect: 'someEffect' },
        { id: 2, name: 'Jinyoung', image: 'jinyoung.png', effect: 'someEffect' },
        { id: 3, name: 'Yugyeom', image: 'yugyeom.png', effect: 'someEffect' },
        { id: 4, name: 'Jaebeom', image: 'jaebeom.png', effect: 'someEffect' },
        { id: 6, name: 'Mark Tuan', image: 'marktuan.png', effect: 'someEffect' },
        { id: 7, name: 'BamBam', image: 'bambam.png', effect: 'someEffect' },
        { id: 8, name: 'Chaeryeong', image: 'chaeryeong.png', effect: 'someEffect' },
        { id: 9, name: 'Yuna', image: 'yuna.png', effect: 'someEffect' },
        { id: 10, name: 'Yeji', image: 'yeji.png', effect: 'someEffect' },
        { id: 11, name: 'Ryujin', image: 'ryujin.png', effect: 'someEffect' },
        { id: 12, name: 'Lia', image: 'lia.png', effect: 'someEffect' },
        { id: 13, name: 'Chaeyoung', image: 'chaeyoung.png', effect: 'someEffect' },
        { id: 14, name: 'Jihyo', image: 'jihyo.png', effect: 'someEffect' },
        { id: 15, name: 'Momo', image: 'momo.png', effect: 'someEffect' },
        { id: 16, name: 'Tzuyu', image: 'tzuyu.png', effect: 'someEffect' },
        { id: 17, name: 'Sana', image: 'sana.png', effect: 'someEffect' },
        { id: 18, name: 'Jeongyeong', image: 'jeongyeon.png', effect: 'someEffect' },
        { id: 19, name: 'Dahyun', image: 'dahyun.png', effect: 'someEffect' },
        { id: 20, name: 'Mina', image: 'mina.png', effect: 'someEffect' },
        { id: 21, name: 'Nayeon', image: 'nayeon.png', effect: 'someEffect' },
        { id: 22, name: 'Ningning', image: 'ningning.png', effect: 'someEffect' },
        { id: 23, name: 'Karina', image: 'karina.png', effect: 'someEffect' },
        { id: 24, name: 'Giselle', image: 'giselle.png', effect: 'someEffect' },
        { id: 25, name: 'Winter', image: 'winter.png', effect: 'someEffect' },
        { id: 26, name: 'Seulgi', image: 'seulgi.png', effect: 'someEffect' },
        { id: 27, name: 'Irene', image: 'irene.png', effect: 'someEffect' },
        { id: 28, name: 'Yeri', image: 'yeri.png', effect: 'someEffect' },
        { id: 29, name: 'Joy', image: 'joy.png', effect: 'someEffect' },
        { id: 30, name: 'Wendy', image: 'wendy.png', effect: 'someEffect' },
        { id: 31, name: 'Taehyun', image: 'taehyun.png', effect: 'someEffect' },
        { id: 32, name: 'Yeonjun', image: 'yeonjun.png', effect: 'someEffect' },
        { id: 33, name: 'Soobin', image: 'soobin.png', effect: 'someEffect' },
        { id: 34, name: 'HueningKai', image: 'hueningkai.png', effect: 'someEffect' },
        { id: 35, name: 'Beomgyu', image: 'beomgyu.png', effect: 'someEffect' }
    ];
}

// Function to initialize the stage deck
function initializeStageDeck() {
    gameState.stageDeck = [
        { id: 1, name: 'Acting Gig', image: 'actinggig.png', effect: 'someEffect' },
        { id: 2, name: 'Award Show', image: 'awardshow.png', effect: 'someEffect' },
        { id: 3, name: 'Comeback Stage', image: 'comebackstage.png', effect: 'someEffect' },
        { id: 4, name: 'Meet and Greet', image: 'meet&greet.png', effect: 'someEffect' },
        { id: 5, name: 'SBS Radio', image: 'sbsradio.png', effect: 'someEffect' },
        { id: 6, name: 'Show Me the Money', image: 'showmethemoney.png', effect: 'someEffect' },
        { id: 7, name: 'Studio Choom', image: 'studiochoom.png', effect: 'someEffect' },
        { id: 8, name: 'Variety Show', image: 'varietyshow.png', effect: 'someEffect' },
        { id: 9, name: 'Yeols Sketch Book', image: 'yeolssketchbook.png', effect: 'someEffect' },
    ];
}

// Function to shuffle the deck
function shuffleDeck(deck) {
    deck.sort(() => Math.random() - 0.5);
}

// Function to select a random stage card
function selectRandomStageCard() {
    shuffleDeck(gameState.stageDeck);
    gameState.selectedStageCard = gameState.stageDeck[0];
}

// Function to deal cards to players and fill the draw pile
function dealCards() {
    shuffleDeck(gameState.deck);
    
    const selectedCards = gameState.deck.splice(0, 10); // Select 10 cards for players
    const cardsPerPlayer = 5;

    // Assign cards to players
    gameState.players.forEach(player => {
        player.hand = selectedCards.splice(0, cardsPerPlayer);
    });

    // Remaining cards go to the draw pile
    gameState.drawPile = [...gameState.deck];
}

// Function to update the game board
function updateGameBoard() {
    const gameBoard = document.getElementById('game-board');

    // Clear the existing content
    gameBoard.innerHTML = `
        <div id="opponent-cards" class="card-row">
            ${renderHand(gameState.players[0].hand)}
        </div>
        <div id="middle-section">
            <div id="discard-pile" class="deck">
                ${renderDiscardPile()} <!-- Render the discard pile -->
            </div>
            ${renderStageCard(gameState.selectedStageCard)} <!-- Render the stage card -->
            ${renderDrawPile()} <!-- Render the draw pile -->
        </div>
        <div id="player-cards" class="card-row">
            ${renderHand(gameState.players[1].hand)}
        </div>
    `;

    attachCardFlipListeners();  // Attach listeners for flipping cards
}

// Function to render the discard pile (showing the topmost card)
function renderDiscardPile() {
    const discardPileContainer = document.getElementById('discard-pile');
    discardPileContainer.innerHTML = ""; // Clear existing content

    if (gameState.discardPile.length > 0) {
        const topCard = gameState.discardPile[gameState.discardPile.length - 1];
        console.log("top card", topCard);

        // Ensure the card rendered here has the correct data-isDiscardPileCard attribute
        discardPileContainer.innerHTML = `
            <div class="card-container">
                <div class="card flipped" data-id="${topCard.id}" data-isDiscardPileCard="true">
                    <div class="card-back">
                        <img src="images/card-back.png" alt="Card Back">
                    </div>
                    <div class="card-front">
                        <img src="images/idols/${topCard.image}" alt="${topCard.name}">
                    </div>
                </div>
            </div>
        `;
    } else {
        discardPileContainer.innerHTML = 'Discard Pile';
    }
}

// Function to render a stage card
function renderStageCard(stageCard) {
    return `
        <div class="card-container">
            <div class="card">  <!-- Start with the 'flipped' class -->
                <div class="card-back">  
                    <img src="images/card-back.png" alt="Card Back">
                </div>
                <div class="card-front">
                    <img src="images/stagecards/${stageCard.image}" alt="${stageCard.name}">
                </div>
            </div>
        </div>
    `;
}

// Function to render a draw pile (with one card face down)
function renderDrawPile() {
    if (gameState.drawPile.length > 0) {
        return `
            <div class="card-container draw-pile">  <!-- Ensure draw-pile class is applied here -->
                <div class="card" data-id="${gameState.drawPile[0].id}">  
                    <div class="card-back">  
                        <img src="images/card-back.png" alt="Card Back">
                    </div>
                    <div class="card-front">
                        <img src="images/idols/${gameState.drawPile[0].image}" alt="Card Back">
                    </div>
                </div>
            </div>
        `;
    } else {
        return '<div class="deck">Draw Deck (Empty)</div>';
    }
}

function renderDiscardPile() {
    const discardPileContainer = document.getElementById('discard-pile');
    
    // Check if the discard pile container exists
    if (!discardPileContainer) {
        console.error("Discard pile container not found.");
        return '';
    }

    // Clear existing content
    discardPileContainer.innerHTML = ""; 

    if (gameState.discardPile.length > 0) {
        const topCard = gameState.discardPile[gameState.discardPile.length - 1]; // Get the top card

        return `
            <div class="card-container">
                <div class="card flipped" data-id="${topCard.id}" data-name="${topCard.name}" data-isDiscardPileCard="true">
                    <div class="card-back">
                        <img src="images/card-back.png" alt="Card Back">
                    </div>
                    <div class="card-front">
                        <img src="images/idols/${topCard.image}" alt="${topCard.name}">
                    </div>
                </div>
            </div>
        `;
    } else {
        return '<div class="deck">Discard Pile (Empty)</div>'; // Render an empty discard pile if no cards
    }
}

function renderHand(hand) {
    return hand.map(card => `
        <div class="card-container">
            <div class="card" data-id="${card.id}" data-name="${card.name}">  <!-- Add data-id for card identification -->
                <div class="card-back">  
                    <img src="images/card-back.png" alt="Card Back">
                </div>
                <div class="card-front">
                    <img src="images/idols/${card.image}" alt="${card.name}">
                </div>
            </div>
        </div>
    `).join('');
}

// Variable to store the currently highlighted card
let highlightedCard = null;  

// Function to attach flip and highlight listeners to cards
function attachCardFlipListeners() {
    document.querySelectorAll('.card').forEach(card => {
        card.dataset.flipped = "false";
        card.dataset.highlighted = "false";

        // Flip and highlight logic
        card.addEventListener('click', (event) => {
            event.stopPropagation(); // Prevent event bubbling
            console.log('Card clicked:', card.dataset.name);

            const isDrawPileCard = !!card.closest('.draw-pile');
            console.log('Is Draw Pile Card:', isDrawPileCard);

            const isDiscardPileCard = card.dataset.isDiscardPileCard === "true";
            console.log('Is Discard Pile Card:', isDiscardPileCard);

            // If a card is already highlighted, and we clicked on a discard pile card, move the highlighted card on top
            if (highlightedCard && isDiscardPileCard) {
                console.log('A highlighted card exists, moving it to the discard pile on top of the clicked card.');
                moveCardToDiscardPile(highlightedCard);
                highlightedCard = null;
                updateGameBoard(); // Re-render to reflect changes

            } else if (card.dataset.flipped === "false") {
                // Flip the card
                console.log('Flipping card...');
                removeHighlightFromAllCards(); // Ensure no other card is highlighted
                card.classList.add('flipped');
                card.dataset.flipped = "true";

                // If it's a card from the draw pile, highlight it after flipping
                if (isDrawPileCard) {
                    console.log('Highlighting draw pile card...');
                    card.classList.add('highlighted');
                    card.dataset.highlighted = "true";
                    highlightedCard = card;
                }
            } else if (card.dataset.highlighted === "false" && !isDiscardPileCard) {
                // Highlight flipped card
                console.log('Highlighting flipped card...');
                removeHighlightFromAllCards();
                card.classList.add('highlighted');
                card.dataset.highlighted = "true";
                highlightedCard = card;
            }
        });
    });

    // Handle clicking on the discard pile itself (empty area or no card clicked)
    document.body.addEventListener('click', (event) => {
        const discardPile = document.getElementById('discard-pile');
        const clickedCardInDiscardPile = discardPile.querySelector('.card');

        console.log('Clicked element:', event.target);
        if (highlightedCard) {
            console.log("there is a highlighted card");
        } else {
            console.log("there is no highlighted card");
        }

        if (clickedCardInDiscardPile) {
            console.log("clicked on a card in Discard Pile");
        } else {
            console.log("did not click on card in discard pile");
        }

        if (event.target.closest('#discard-pile')) {
            console.log("clicked on discard pile");
        } else {
            console.log("did not click on discard pile");
        }

        // Case 1: If there's a highlighted card, move it to the discard pile
        if (highlightedCard && event.target.closest('.deck, .card')) {
            console.log('Moving highlighted card to discard pile...');
            moveCardToDiscardPile(highlightedCard);
            highlightedCard = null;
            updateGameBoard(); // Re-render the board to reflect the discard pile update

        // Case 2: If no card is highlighted and the discard pile is clicked, highlight the top card in the pile
        } else if (!highlightedCard && clickedCardInDiscardPile && event.target.closest('#discard-pile')) {
            console.log('Highlighting card in discard pile...');
            clickedCardInDiscardPile.classList.add('highlighted');
            clickedCardInDiscardPile.dataset.highlighted = "true";
            highlightedCard = clickedCardInDiscardPile;
        }
    });
}


// Ensure the card is added to the discard pile and re-rendered
function moveCardToDiscardPile(card) {
    console.log('moveCardToDiscardPile called for card:', card.dataset.name);
    const discardPile = document.getElementById('discard-pile');

    // Move the card container to the discard pile
    discardPile.appendChild(card.parentElement);  // Physically move the card
    card.classList.remove('highlighted');
    card.dataset.highlighted = "false";

    // Set the isDiscardPileCard flag to true
    card.dataset.isDiscardPileCard = "true";

    const cardId = parseInt(card.dataset.id);  // Get card ID from dataset
    //console.log('Card ID:', cardId);

    // Ensure cardId is valid before proceeding
    if (!isNaN(cardId)) {
        // Remove card from player's hand and add to discard pile
        gameState.players.forEach(player => {
            const cardIndex = player.hand.findIndex(c => c.id === cardId);
            if (cardIndex !== -1) {
                const [removedCard] = player.hand.splice(cardIndex, 1);  // Remove the card from the hand
                gameState.discardPile.push(removedCard);  // Add the card to the discard pile
                console.log('Card moved to discard pile in game state:', removedCard.name);
            }
        });
        // After moving the card, update the game board to re-render the discard pile
        updateGameBoard();
    } else {
        console.error("Invalid cardId:", cardId);
    }
}


// Helper function to remove highlighting from all cards
function removeHighlightFromAllCards() {
    //console.log('Removing highlights from all cards');
    document.querySelectorAll('.card.highlighted').forEach(card => {
        card.classList.remove('highlighted');
        card.dataset.highlighted = "false";
    });
    highlightedCard = null;
}

// Start the game
function startGame() {
    console.log('Starting game...');
    initializeDeck();
    initializeStageDeck();
    shuffleDeck(gameState.deck);
    selectRandomStageCard();  // Select a random stage card
    dealCards();
    updateGameBoard();  // This must be called to render the game board
}

// Call startGame when the page loads
window.onload = startGame;
