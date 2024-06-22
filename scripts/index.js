const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },

  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

console.log(initialCards);

const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileCloseButton = profileEditModal.querySelector(
  "#profile-close-button"
);
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector("#profile-title-input");
const addCardFormElement = document.querySelector(".modal__form");

const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);

const cardAddModal = document.querySelector("#profile-add-modal");
const cardAddButton = document.querySelector("#add-button");
const cardCloseButton = cardAddModal.querySelector("#profile-close-button");
const cardAddForm = document.querySelector("#add-card-form");
const cardPopup = document.querySelector("#picture-add-modal");
const cardPopupCloseButton = cardPopup.querySelector("profile-close-button");

const cardPopupImg = cardPopup.querySelector(".modal__image");
const profileEditForm = profileEditModal.querySelector(".modal__form");
const cardListEl = document.querySelector(".cards__list");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
/*Functions*/
const cardTitleInput = addCardFormElement.querySelector(
  ".modal__input_type_title"
);
const cardUrlInput = addCardFormElement.querySelector(".modal__input_type_url");
function closePopup(modal) {
  modal.classList.remove("modal_opened");
}
function renderCard(cardData, wrapper) {
  const cardElement = getCardElement(cardData);
  wrapper.append(cardElement);
}

function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closePopup(profileEditModal);
}

function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardTitleEl = cardElement.querySelector(".card__title");

  const likeButton = cardElement.querySelector(".card__like-button");
  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_active");
  });
  const cardDeleteButton = cardElement.querySelector(".card__trash-button");
  cardDeleteButton.addEventListener("click", () => cardElement.remove());
  cardImageEl.addEventListener("click", () => {
    cardPopup.classList.add("modal_opened");
    cardPopupImg.src = ".modal__image";
    cardPopupImg.alt = "alt value";
  });

  cardTitleEl.textContent = cardData.name;
  cardImageEl.src = cardData.link;
  cardImageEl.alt = cardData.name;

  return cardElement;
}
function handleAddCardFormSubmit(e) {
  e.preventDefault();
  const name = cardTitleInput.value;
  const link = cardUrlInput.value;
  const cardElement = getCardElement({
    name,
    link,
  });
  closePopup(cardAddModal);
}
//Event Listeners
profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  profileEditModal.classList.add("modal_opened");
});

cardAddButton.addEventListener("click", () => {
  cardAddModal.classList.add("modal_opened");
});

profileCloseButton.addEventListener("click", () =>
  closePopup(profileEditModal)
);

cardCloseButton.addEventListener("click", () => closePopup(cardAddModal));
console.log(cardCloseButton);

cardPopupCloseButton.addEventListener("click", () => closePopup(cardPopup));

profileEditForm.addEventListener("submit", handleProfileEditSubmit);
addCardFormElement.addEventListener("submit", handleAddCardFormSubmit);
cardAddForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const title = e.target.title.value;
  const link = e.target.link.value;
  getCardElement({
    name: title,
    link: link,
  });
  closePopup(cardAddModal);
});

initialCards.forEach((cardData) => renderCard(cardData, cardListEl));
