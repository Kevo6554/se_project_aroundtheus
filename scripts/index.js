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

const modal = document.querySelector(".modal");

const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileCloseButton = profileEditModal.querySelector(
  "#profile-close-button"
);
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector("#profile-title-input");

const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);

const cardAddModal = document.querySelector("#profile-add-modal");
const cardAddButton = document.querySelector("#add-button");
const cardCloseButton = cardAddModal.querySelector("#card-close-button");
const cardAddForm = document.querySelector("#add-card-form");
const cardPopup = document.querySelector("#picture-add-modal");
const cardPopupCloseButton = cardPopup.querySelector("#picture-close-button");

const cardPopupImg = cardPopup.querySelector(".modal__image");
const profileEditForm = profileEditModal.querySelector(".modal__form");
const cardListEl = document.querySelector(".cards__list");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
const cardTitleInput = cardAddForm.querySelector(".modal__input_type_title");
const cardUrlInput = cardAddForm.querySelector(".modal__input_type_url");
const cardDisableButton = cardAddForm.querySelector("modal__button_disabled");
/*Functions*/

function renderCard(cardData) {
  const cardElement = getCardElement(cardData);
  const cardListEl = document.querySelector(".cards__list");
  cardListEl.prepend(cardElement);
}
//closepopup
function closePopup(modal) {
  modal.classList.remove("modal_opened");
  document.addEventListener("click", handleOutsideClick);
}

function openPopup(modal) {
  modal.classList.add("modal_opened");
  document.removeEventListener("click", handleOutsideClick);
}

function handleOutsideClick(event) {
  if (
    !modal.contains(event.target) &&
    !event.target.closest(".modal") &&
    !event.target.classList.contains(".modal__button")
  ) {
    closePopup();
  }
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
    openPopup(cardPopup);
    cardPopupImg.src = cardData.link;
    cardPopupImg.alt = cardData.name;
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
  const cardElement = renderCard({
    name,
    link,
  });
  closePopup(cardAddModal);
  cardAddForm.reset();
}

//Event Listeners
profileEditButton.addEventListener("click", (handleAddCardFormSubmit) => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openPopup(profileEditModal);
});

cardAddButton.addEventListener("click", () => {
  disableButton(cardDisableButton, validationConfig.inactiveButtonClass);
  openPopup(cardAddModal);
});

profileCloseButton.addEventListener("click", () =>
  closePopup(profileEditModal)
);

cardCloseButton.addEventListener("click", () => closePopup(cardAddModal));
console.log(cardCloseButton);

cardPopupCloseButton.addEventListener("click", () => closePopup(cardPopup));

profileEditForm.addEventListener("submit", handleProfileEditSubmit);
cardAddForm.addEventListener("submit", handleAddCardFormSubmit);

initialCards.forEach((cardData) => renderCard(cardData, cardListEl));
