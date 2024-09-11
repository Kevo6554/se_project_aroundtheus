import Card from "../components/Cards.js";
import FormValidator from "../components/FormValidator.js";
import "../pages/index.css";
import Popup from "../components/Popup.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithImage from "../components/PopupWithImage.js";
import {
  initialCards,
  profileEditButton,
  profileEditModal,
  profileDescription,
  profileTitle,
  profileTitleInput,
  profileDescriptionInput,
  cardAddButton,
  cardAddForm,
  cardAddModal,
  cardListEl,
  profileEditForm,
  cardTitleInput,
  cardUrlInput,
  validationConfig,
} from "../utils/constants.js";
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

const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  descriptionSelector: ".profile__description",
});

const addCardModal = new PopupWithForm({
  popupSelector: "#profile-add-modal",
  handleFormSubmit: handleAddCardFormSubmit,
});
addCardModal.setEventListeners();

const editProfileModal = new PopupWithForm({
  popupSelector: "#profile-edit-modal",
  handleFormSubmit: handleProfileEditSubmit,
});
editProfileModal.setEventListeners();
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

function handleProfileEditSubmit() {
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  this.close();
}

function handleAddCardFormSubmit() {
  const name = cardTitleInput.value;
  const link = cardUrlInput.value;
  renderCard({
    name,
    link,
  });
  this.close();
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
