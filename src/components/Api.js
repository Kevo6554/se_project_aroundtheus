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

  setUserInfo(name, about) {
    return fetch(`${this._baseURL}/users/me`, {
      method: "PATCH",
      headers: {
        ...this._headers,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        about,
      }),
    }).then((res) =>
      res.ok ? res.json() : Promise.reject(`Error: ${res.status}`)
    );
  }

  setUserAvatar(link) {
    console.log("Avatar link:", link);

    return fetch(`${this._baseURL}/users/me/avatar`, {
      method: "PATCH",
      headers: { ...this._headers, "Content-Type": "application/json" },
      body: JSON.stringify({ avatar: link }),
    }).then((res) =>
      res.ok ? res.json() : Promise.reject(`Error: ${res.status}`)
    );
  }

  uploadCard({ name, link }) {
    return fetch(`${this._baseURL}/cards`, {
      method: "POST",
      headers: {
        ...this._headers,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: name, link: link }),
    }).then((res) =>
      res.ok ? res.json() : Promise.reject(`Error: ${res.status}`)
    );
  }

  deleteCard(cardId) {
    console.log("Deleting card with ID:", cardId);

    return fetch(`${this._baseURL}/cards/${cardId}`, {
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

  likeCard(cardId, isLiked) {
    return fetch(`${this._baseURL}/cards/${cardId}/likes`, {
      method: isLiked ? "DELETE" : "PUT",
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
