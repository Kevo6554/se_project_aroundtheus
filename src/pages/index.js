import Card from "../components/Cards.js";
import FormValidator from "../components/FormValidator.js";
import "../pages/index.css";
import Popup from "../components/Popup.js";
import PopupWithForm from "../components/Popupwithform.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithImage from "../components/PopupWithImage.js";

const validationConfig = {
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

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
const cardPopUpCaption = cardPopup.querySelector(".modal__heading");

const addCardFormValidator = new FormValidator(validationConfig, cardAddForm);
const profileEditValidator = new FormValidator(
  validationConfig,
  profileEditForm
);

const cardList = new Section(
  {
    items: initialCards,
    renderer: (data) => {
      cardList.addItem(createCard(data));
    },
  },
  ".cards__list"
);

const popup = new Popup("#picture-close-button");
popup.setEventListeners();

const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  descriptionSelector: ".profile__description",
});
const addCardModal = new PopupWithForm({
  popupSelector: "#profile-add-modal",
  handleFormSubmit: handleAddCardFormSubmit,
});

const editProfileModal = new PopupWithForm({
  popupSelector: "#profile-edit-modal",
  handleFormSubmit: handleProfileEditSubmit,
});
cardAddButton.addEventListener("click", () => addCardModal.open());
profileEditButton.addEventListener("click", () => editProfileModal.open());

const imagePopup = new PopupWithImage({
  popupSelector: "#picture-add-modal",
});
imagePopup.setEventListeners();

// Enable form validation
addCardFormValidator.enableValidation();
profileEditValidator.enableValidation();
/*Functions*/

function handleImageClick(data) {
  imagePopup.open(data);
}

//closepopup

/*
function closeModalOnEvent(event) {
  const modals = document.querySelectorAll(".modal");

  console.log("Event type:", event.type, event); // Log event type and event

  if (event.type === "keydown" && event.key === "Escape") {
    console.log("Escape key pressed");
    modals.forEach((modal) => {
      closePopup(modal);
      console.log("Closed modal on Escape key");
    });
  }

  if (event.type === "click") {
    console.log("Click event target:", event.target); // Log event target
    modals.forEach((modal) => {
      if (!modal.contains(event.target)) {
        closePopup(modal);
        console.log("Closed modal on click outside");
      }
    });
  }
}
*/

// Add event listeners
/*
document.addEventListener("keydown", closeModalOnEscape);
document.addEventListener("click", closeModalOnEv);*/

function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closePopup(profileEditModal);
}

function handleAddCardFormSubmit(e) {
  e.preventDefault();
  const name = cardTitleInput.value;
  const link = cardUrlInput.value;
  renderCard({
    name,
    link,
  });
  closePopup(cardAddModal);
  e.target.reset();
  addCardFormValidator.toggleButtonState();
}

function renderCard(data) {
  cardListEl.prepend(createCard(data));
}

function createCard(data) {
  const card = new Card(data, "#card-template", handleImageClick);
  return card.generateCard();
}

//Event Listeners

initialCards.forEach((cardData) => renderCard(cardData, cardListEl));
