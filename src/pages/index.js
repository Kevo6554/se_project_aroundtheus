import Card from "../components/Cards.js";
import FormValidator from "../components/FormValidator.js";
import "../pages/index.css";
import Popup from "../components/Popup.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Api from "../components/Api.js";
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
    renderer: (item) => {
      const cardELement = createCard(item);
      cardList.addItem(cardELement);
    },
  },
  ".cards__list"
);
//cardList.renderItems();

const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  descriptionSelector: ".profile__description",
  avatarSelector: ".profile__image",
});

api
  .setUserInfo(modalTitle, desc)
  .then((res) => {
    userInfo.getUserInfo(res.name, res.about);
  })
  .catch((err) => {
    console.error("Error updating user info", err);
    alert(err);
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
cardAddButton.addEventListener("click", () => {
  addCardFormValidator.toggleButtonState();
  addCardModal.open();
});
profileEditButton.addEventListener("click", () => {
  const formValues = userInfo.getUserInfo();
  profileTitleInput.value = formValues.name;
  profileDescriptionInput.value = formValues.about;
  editProfileModal.open();
});

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
function handleProfileEditSubmit(formValues) {
  userInfo.setUserInfo({
    name: formValues.title,
    about: formValues.about,
  });
  editProfileModal.close();
}
function handleAddCardFormSubmit(formValues) {
  const name = formValues.title;
  const link = formValues.link;

  const card = createCard({ name, link });
  cardList.addItem(card);
  console.log(formValues);
  cardAddForm.reset();
  addCardModal.close();
}

function createCard(data) {
  const card = new Card(data, "#card-template", handleImageClick);
  return card.generateCard();
}

//Event Listeners
// Test line
const api = new Api("https://around-api.en.tripleten-services.com/v1", {
  authorization: "f5e7da7f-f9a4-4037-8dd1-a9066e254adc",
});
console.log(api);

api
  .getInitialCards()
  .then((res) => cardList.renderItems(res))
  .catch((err) => alert(err));
