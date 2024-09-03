export default class Section {
  constructor({ renderer, items }, containerSelector) {
    this._items = items;
    this._container = document.querySelector(containerSelector);
    this._renderer = renderer;
  }
  renderItems() {
    this.clear();
    this._renderedItems.forEach((item) => {
      const card = item.isOwner
        ? new UserCard(item, ".card-template_type_user")
        : new DefaultCard(item, ".card-template_type_default");
      const cardElement = card.generateCard();
      this.setItem(cardElement);
    });
  }

  setItem(element) {
    this._container.append(element);
  }

  clear() {
    this._container.innerHTML = "";
  }

  addItem(element) {
    this.setItem(element);
  }
}
