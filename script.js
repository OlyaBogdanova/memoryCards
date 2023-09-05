const cardsContainer = document.getElementById("cards-container");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const currentEl = document.getElementById("current");
const showBtn = document.getElementById("show");
const hideBtn = document.getElementById("hide");
const questionEl = document.getElementById("question");
const answerEl = document.getElementById("answer");
const addCardBtn = document.getElementById("add-card");
const clearBtn = document.getElementById("clear");
const addContainer = document.getElementById("add-container");

//Current card
let currentActiveCard = 0;

const cardsEl = [];
const cardsData = getCardsData();

function getCardsData() {
  const cards = JSON.parse(localStorage.getItem("cards"));
  return cards === null ? [] : cards;
}

function createCards() {
  cardsData.forEach((card, index) => createCard(card, index));
}

function createCard(cardEl, index) {
  const card = document.createElement("div");
  card.classList.add("card");
  if (index === 0) {
    card.classList.add("active");
  }
  card.innerHTML = `
    <div class="inner-card">
    <div class="inner-card-front">
        <p>${cardEl.question}</p>
    </div>
    <div class="inner-card-back">
        <p>${cardEl.answer}</p>
    </div>
</div>
    `;
  card.addEventListener("click", () => {
    card.classList.toggle("show-answer");
  });
  cardsEl.push(card);
  cardsContainer.appendChild(card);
  updateCurrentText();
}
//number of card
function updateCurrentText() {
  currentEl.innerText = `${currentActiveCard + 1}/${cardsEl.length}`;
}

createCards();

//Кнопки вперед/назад
nextBtn.addEventListener("click", () => {
  cardsEl[currentActiveCard].className = "card left";
  currentActiveCard = currentActiveCard + 1;
  if (currentActiveCard > cardsEl.length - 1) {
    currentActiveCard = cardsEl.length - 1;
  }
  cardsEl[currentActiveCard].className = "card active";
  updateCurrentText();
});

prevBtn.addEventListener("click", () => {
  cardsEl[currentActiveCard].className = "card right";
  currentActiveCard = currentActiveCard - 1;
  if (currentActiveCard < 0) {
    currentActiveCard = 0;
  }
  cardsEl[currentActiveCard].className = "card active";
  updateCurrentText();
});

showBtn.addEventListener("click", () => {
  addContainer.classList.add("show");
});

hideBtn.addEventListener("click", () => {
  addContainer.classList.remove("show");
});
addCardBtn.addEventListener("click", () => {
  const question = questionEl.value;
  const answer = answerEl.value;
  if (question.trim() && answer.trim()) {
    const newCard = {
      question,
      answer,
    };
    createCard(newCard);
    questionEl.value = "";
    answerEl.value = "";
    addContainer.classList.remove("show");
    cardsData.push(newCard);
    setCardsData(cardsData);
  }
});
//в localstorage
function setCardsData(data) {
  localStorage.setItem("cards", JSON.stringify(data));
  window.location.reload();
}

clearBtn.addEventListener("click", () => {
  localStorage.clear();
  cardsContainer.innerHTML = "";
  window.location.reload()
});
