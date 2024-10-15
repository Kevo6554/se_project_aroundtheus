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

export {
  initialCards,
  profileEditButton,
  profileEditModal,
  profileCloseButton,
  profileDescription,
  profileTitle,
  profileTitleInput,
  profileDescriptionInput,
  cardAddButton,
  cardAddForm,
  cardCloseButton,
  cardAddModal,
  cardDisableButton,
  cardListEl,
  cardPopUpCaption,
  cardPopup,
  cardPopupCloseButton,
  cardPopupImg,
  profileEditForm,
  cardTemplate,
  cardTitleInput,
  cardUrlInput,
  validationConfig,
};
