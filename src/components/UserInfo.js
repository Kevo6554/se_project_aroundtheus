// ./components/UserInfo.js
export default class UserInfo {
  constructor({ nameSelector, descriptionSelector, profileImage }) {
    this._nameElement = document.querySelector(nameSelector);
    this._aboutElement = document.querySelector(descriptionSelector);
    this._profileImage = document.querySelector(profileImage);
  }

  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      about: this._aboutElement.textContent,
      image: this._profileImage.textContent,
    };
  }

  setUserInfo({ name, about }) {
    this._nameElement.textContent = name;
    this._aboutElement.textContent = about;
  }

  updateProfileImage(image) {
    if (image.avatar) {
      this._profileImage.src = image.avatar;
    }
  }
}
