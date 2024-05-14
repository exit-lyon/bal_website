function moveCarousel(current_card) {
  const cards = Array.from(current_card.parentElement.getElementsByClassName("card"));

  const current_card_index = cards.indexOf(current_card);
  const last_index = cards.length - 1;

  const previous_card_index = (current_card_index === 0 ? last_index : current_card_index - 1);
  const next_card_index = (current_card_index === last_index ? 0 : current_card_index + 1)

  const other_indices = new Set(cards.keys());
  other_indices.delete(previous_card_index);
  other_indices.delete(current_card_index);
  other_indices.delete(next_card_index);

  cards[current_card_index].classList.add("middle-card");
  cards[current_card_index].classList.remove("left-card");
  cards[current_card_index].classList.remove("right-card");
  cards[current_card_index].classList.remove("hidden-card");

  cards[previous_card_index].classList.add("left-card");
  cards[previous_card_index].classList.remove("middle-card");
  cards[previous_card_index].classList.remove("right-card");
  cards[previous_card_index].classList.remove("hidden-card");

  cards[next_card_index].classList.add("right-card");
  cards[next_card_index].classList.remove("left-card");
  cards[next_card_index].classList.remove("middle-card");
  cards[next_card_index].classList.remove("hidden-card");

  for (const i of other_indices) {
    cards[i].classList.add("hidden-card");
    cards[i].classList.remove("left-card");
    cards[i].classList.remove("right-card");
    cards[i].classList.remove("middle-card");
  }
}

function autoMoveCarousel(card_deck) {
  const next_card = card_deck.getElementsByClassName("right-card")[0];
  moveCarousel(next_card);
}

const card_decks = Array.from(document.getElementsByClassName("cards"));
const card_deck_to_interval = new Map();
const card_deck_to_timeout = new Map();
for (const card_deck of card_decks) {
  card_deck_to_interval.set(card_deck, setInterval(function () {
    autoMoveCarousel(card_deck)
  }, 2000));
}

function clickCarousel(event) {
  const current_card = event.target.parentElement;
  const current_card_deck = current_card.parentElement;
  moveCarousel(current_card);

  clearInterval(card_deck_to_interval.get(current_card_deck));
  clearTimeout(card_deck_to_timeout.get(current_card_deck));
  card_deck_to_timeout.set(current_card_deck, setTimeout(function () {
    card_deck_to_interval.set(current_card_deck, setInterval(function () {
      autoMoveCarousel(current_card_deck)
    }, 2000));
  }, 10000));
}


// 2024 Add-ons

var map = L.map('map').setView([45.7677796, 4.8358137], 18);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

var marker = L.marker([45.7677796, 4.8358137]).addTo(map);

marker.bindPopup("<b>Hôtel de Ville de Lyon</b><br>Entrée Place de la Comédie").openPopup();

// Sparkles


const randomProperties = function (particle) {
  const left = Math.random() * 100;
  particle.style.setProperty('--left', left + '%');

  const body = document.body;
  const html = document.documentElement;
  const documentHeight = Math.max(body.scrollHeight, body.offsetHeight, 
      html.clientHeight, html.scrollHeight, html.offsetHeight );

  const top = Math.random() * documentHeight;
  particle.style.setProperty('--top', top + 'px');

  const size = Math.floor(Math.random() * (6 - 2)) + 2;
  particle.style.setProperty('--size', size + 'px');
  particle.style.setProperty('--blur', (size * 4) + 'px');
  particle.style.setProperty('--spread', (size) + 'px');

  const opacity = Math.random() + 0.1;
  particle.style.setProperty('--opacity', opacity);

  const duration = Math.floor(Math.random() * (3000 - 1500)) + 1500;
  particle.style.setProperty('--duration', duration + 'ms');

  const delay = Math.floor(Math.random() * (3000 - 1500)) + 1500;
  particle.style.setProperty('--delay', delay + 'ms');

  const iteration = Math.floor(Math.random() * (100000000 - 4)) + 4;
  particle.style.setProperty('--iteration', iteration);
};

const removeSparkles = function() {
  let sparkles = document.getElementsByClassName('particle');

  for (const sparkle of sparkles) {
    sparkle.parentNode.removeChild(sparkle);
  }
};

const addSparkles = function() {
  let maxCount = 500;

  for (let i = 0; i < maxCount; i++) {
    let sparkle = document.createElement("div");
    sparkle.classList.add("particle");

    let body = document.querySelector('body');
    body.appendChild(sparkle);

    randomProperties(sparkle);
  }
};

setTimeout(addSparkles, 1000)
