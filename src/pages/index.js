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

function handleProfileEditSubmit() {
  const name = document.querySelector(".profile__title").value;
  const about = document.querySelector(".profile__description").value;
  userInfo.setUserInfo({ name, job: about });
  editProfileModal.close();
  document
    .querySelector("#profile-edit-modal")
    .addEventListener("submit", handleProfileEditSubmit);
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
