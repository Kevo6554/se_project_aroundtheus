export default class Api {
  constructor(baseURL, headers) {
    this._baseURL = baseURL;
    this._headers = headers;
  }

  _checkResponse(res) {
    return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
  }

  getInitialCards() {
    return fetch(`${this._baseURL}/cards`, {
      headers: { ...this._headers },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }

  setUserInfo() {
    return fetch(`/users/me`, {
      headers: {
        authorization: "f5e7da7f-f9a4-4037-8dd1-a9066e254adc",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: "Kevin",
        about: desc,
      }),
    });
  }

  setUserAvatar({ link }) {
    return fetch(`/users/me/avatar`, {
      method: "PATCH",
      body: JSON.stringify({ avatar: link }),
    });
  }

  uploadCard({ name, desc }) {
    return fetch(`/cards`, {
      method: "POST",
      headers: {
        authorization: "f5e7da7f-f9a4-4037-8dd1-a9066e254adc",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: modalTitle, about: desc }),
    });
  }

  unlikeCard() {
    return fetch(`${this._baseURL}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Error: ${res.status}`);
      }
    });
  }

  likeCard() {
    return fetch(`${this._baseURL}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this._headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Error: ${res.status}`);
      }
    });
  }
}
