import Card from "../components/Cards.js";
import FormValidator from "../components/FormValidator.js";
import "../pages/index.css";
import Popup from "../components/Popup.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Api from "../components/Api.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";
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
    renderer: (item) => {
      const cardELement = createCard(item);
      cardList.addItem(cardELement);
    },
  },
  ".cards__list"
);
//cardList.renderItems();
const api = new Api("https://around-api.en.tripleten-services.com/v1", {
  authorization: "f5e7da7f-f9a4-4037-8dd1-a9066e254adc",
});
console.log(api);

const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  descriptionSelector: ".profile__description",
  avatarSelector: ".profile__image",
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
  api
    .setUserInfo(formValues.name, formValues.about)
    .then((res) => {
      userInfo.getUserInfo(res.name, res.about);
    })
    .catch((err) => {
      console.error("Error updating user info", err);
      alert(err);
    });
  editProfileModal.close();
}
function handleAddCardFormSubmit(formValues) {
  const name = formValues.title;
  const link = formValues.link;
  // Make API request to upload card
  api
    .uploadCard({ name, link })
    .then((cardData) => {
      const card = createCard(cardData);

      cardList.addItem(card);
      addCardModal.close();
      cardAddForm.reset();
    })
    .catch((error) => {
      console.error(error);
    });
}

function createCard(data) {
  const card = new Card(data, "#card-template", handleImageClick);
  return card.generateCard();
}

api
  .getInitialCards()
  .then((res) => {
    console.log(res);
    cardList.renderItems(res);
  })

  .catch((err) => alert(err));

//Avatar
const profileImageForm = document.querySelector("#edit-avatar-form");
const profileFormValidator = new FormValidator(
  validationConfig,
  profileImageForm
);
profileFormValidator.enableValidation();

function handleImageProfileEditSubmit(data) {
  newProfileImageModal.handleLoad(true, "Saving...");
  api
    .setUserAvatar(data.link)
    .then(() => {
      userInfo.setProfileImage(data.link);
      newProfileImageModal.close();
      profileImageForm.reset();
      profileFormValidator.disableButton();
    })
    .catch((err) => {
      console.error(err);
    });
}

const profileImageCover = document.querySelector(".profile__edit-image");
profileImageCover.addEventListener("click", () => {
  newProfileImageModal.open();
});

const newProfileImageModal = new PopupWithForm({
  popupSelector: "#edit-avatar-modal",
  handleImageProfileEditSubmit,
});
newProfileImageModal.setEventListeners();

// confirmation

function handleDeleteCard(card) {
  confirmDeleteModal.setSubmitFunction(() => {
    api
      .handleDeleteCard(card._id)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.error(err);
      });
  });
  confirmDeleteModal.open();
}

const confirmDeleteModal = new PopupWithConfirmation({
  popupSelector: "#confirmation-modal",
  handleConfirm: handleDeleteCard,
});
confirmDeleteModal.setEventListeners();

function handleLikeCard(card) {
  confirmLikeModal.setSubmitFunction(() => {
    api
      .handleLikeCard(card._id)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.error(err);
      });
  });
  confirmLikeModal.open();
}

const confirmLikeModal = new PopupWithConfirmation({
  popupSelector: "#confirmation-modal",
  handleConfirm: handleLikeCard,
});
confirmLikeModal.setEventListeners();
