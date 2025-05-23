const tabs = document.querySelectorAll('.tab');
tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.tab, .section').forEach(el => el.classList.remove('active'));
    tab.classList.add('active');
    document.getElementById(tab.dataset.tab).classList.add('active');
  });
});

const startBtn = document.getElementById('start-button');
startBtn.addEventListener('click', () => {
  document.querySelector('.tab[data-tab="play"]').click();
  initGame();
});

const board = document.getElementById('game-board');
let cards = [];
let flipped = [];
let attempts = 0;
let matches = 0;

function initGame() {
  attempts = 0; matches = 0;
  document.getElementById('attempts').textContent = attempts;
  document.getElementById('matches').textContent = matches;
  board.innerHTML = '';
  cards = createShuffledDeck();
  cards.forEach(card => board.appendChild(createCardElement(card)));
}

function createShuffledDeck() {
  const months = [...Array(12).keys()].map(m => `🌸${m+1}`); // Blossom emoji + number
  let deck = [];
  months.forEach((m, i) => {
    deck.push({ month: m });
    deck.push({ month: m });
  });
  return deck.sort(() => Math.random() - 0.5);
}

function createCardElement(data) {
  const card = document.createElement('div');
  card.className = 'card';
  const inner = document.createElement('div');
  inner.className = 'card-inner';
  const front = document.createElement('div');
  front.className = 'card-front';
  front.textContent = data.month;
  const back = document.createElement('div');
  back.className = 'card-back';
  inner.append(back, front);
  card.append(inner);

  card.addEventListener('click', () => {
    if (flipped.length < 2 && !card.classList.contains('flipped')) {
      card.classList.add('flipped');
      flipped.push({ element: card, data });
      if (flipped.length === 2) {
        attempts++;
        document.getElementById('attempts').textContent = attempts;
        checkForMatch();
      }
    }
  });
  return card;
}

function checkForMatch() {
  const [a, b] = flipped;
  if (a.data.month === b.data.month) {
    matches++;
    document.getElementById('matches').textContent = matches;
    flipped = [];
    if (matches === 12) alert('Congratulations! You matched all months!');
  } else {
    setTimeout(() => {
      a.element.classList.remove('flipped');
      b.element.classList.remove('flipped');
      flipped = [];
    }, 800);
  }
}