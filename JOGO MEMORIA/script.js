// Seletor para o contêiner do jogo
const gameBoard = document.querySelector('.game-board');

// Variáveis do jogo
let firstCard = null;
let secondCard = null;
let lockBoard = false; // Bloqueia o tabuleiro enquanto verifica os pares
let matchedPairs = 0; // Contador de pares encontrados
const totalPairs = 8; // Número total de pares no jogo (8 pares)

// Função para inicializar o jogo
function setupGame() {
    const cards = Array.from(document.querySelectorAll('.card'));
    
    // Embaralha os cartões e adiciona ao tabuleiro
    shuffle(cards);
    cards.forEach(card => gameBoard.appendChild(card));
    
    // Adiciona eventos de clique a cada cartão
    cards.forEach(card => {
        card.addEventListener('click', flipCard);
    });
}

// Função para embaralhar os cartões
function shuffle(array) {
    array.forEach(card => {
        const randomPos = Math.floor(Math.random() * array.length);
        card.style.order = randomPos;
    });
}

// Função para virar o cartão
function flipCard() {
    if (lockBoard || this === firstCard || this.classList.contains('flipped')) {
        return;
    }

    this.classList.add('flipped');
    if (!firstCard) {
        firstCard = this;
        return;
    }

    secondCard = this;
    checkMatch();
}

// Função para verificar se os cartões virados são um par
function checkMatch() {
    const firstCardImage = firstCard.querySelector('.back').style.backgroundImage;
    const secondCardImage = secondCard.querySelector('.back').style.backgroundImage;

    const isMatch = firstCardImage === secondCardImage;

    if (isMatch) {
        disableCards();
    } else {
        unflipCards();
    }
}

// Função para desativar os cartões correspondentes
function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    matchedPairs++;
    resetBoard();
    if (matchedPairs === totalPairs) {
        setTimeout(() => alert('Parabéns! Você ganhou o jogo!'), 500);
    }
}

// Função para virar os cartões de volta se não corresponderem
function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        resetBoard();
    }, 1000);
}

// Função para resetar o estado do tabuleiro
function resetBoard() {
    [firstCard, secondCard, lockBoard] = [null, null, false];
}

// Inicializa o jogo
setupGame();


