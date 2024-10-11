export default class Api {
  constructor(baseURL, headers) {
    this._baseURL = baseURL;
    this._headers = headers;
  }
  Api() {
    return fetch(`${this._baseURL}${endpoint}`, {
      headers: this._headers,
      method: method,
      body: body,
    });
  }

  _checkResponse(res) {
    return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
  }

  getInitialCards() {
    return this._request(`/cards`, {});
  }

  getUserInfo() {
    return this._request(`/users/me`, {});
  }

  setUserInfo({ name, desc }) {
    return this._request(`/users/me`, {
      method: "PATCH",
      body: JSON.stringify({ name: modalTitle, about: desc }),
    });
  }

  setUserAvatar({ link }) {
    return this._request(`/users/me/avatar`, {
      method: "PATCH",
      body: JSON.stringify({ avatar: link }),
    });
  }

  uploadCard({ myObj }) {
    return this._request(`/cards`, {
      method: "POST",
      body: JSON.stringify({ myObj }),
    });
  }

  deleteCard(id) {
    return this._request(`/cards/${id}`, {
      method: "DELETE",
    });
  }

  updateCardLike(id, method) {
    return this._request(`/cards/${id} / likes`, {
      method: method,
    });
  }
}
