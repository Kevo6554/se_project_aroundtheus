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
cardList.renderItems();

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

const myObj = {
  isLiked: false,
  _id: "64a55f2a91758c001af2a1bd",
  name: "Bald Mountains",
  link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  owner: {
    about: "Sailor, researcher",
    avatar:
      "https://practicum-content.s3.us-west-1.amazonaws.com/frontend-developer/common/avatar.jpg",
    name: "Jacques Cousteau",
    _id: "e20537ed11237f86bbb20ccb",
  },
  createdAt: "2023-07-05T12:16:42.240Z",
};
fetch("https://around-api.en.tripleten-services.com/v1/users/me", {
  method: "PATCH",
  headers: {
    authorization: "f5e7da7f-f9a4-4037-8dd1-a9066e254adc",
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    name: "Marie Skłodowska Curie",
    about: "Physicist and Chemist",
  }),
});

fetch("https://around-api.en.tripleten-services.com/v1/cards", {
  method: "POST",
  headers: {
    authorization: "f5e7da7f-f9a4-4037-8dd1-a9066e254adc",
    "Content-Type": "application/json",
  },
  body: JSON.stringify(myObj),
})
  .then((res) => res.json())
  .then((result) => {
    console.log(result);
    alert("Success");
  })
  .catch((err) => {
    console.log("Oops their was an error", err);
  })
  .finally(() => {
    alert("Ok we are done");
  });

Api.getInitialCards()
  .then((res) => cardList.renderItems(res))
  .catch((err) => alert(err));
