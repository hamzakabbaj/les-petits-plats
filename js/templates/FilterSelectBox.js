class FilterSelectBox {
  constructor(filter) {
    this._filter = filter;
  }

  createFilterSelectBox() {
    const $wrapper = document.createElement("div");
    $wrapper.classList.add("main__header__filters__select-box");
    $wrapper.setAttribute("id", this._filter.id);
    const filterSelectBox = `
      <div class="main__header__filters__select-box__title">
        <span>${this._filter.label}</span>
        <i class="fa-solid fa-chevron-down"></i>
      </div>
      <div class="main__header__filters__select-box__search">
        <input type="text"/>
        <i class="fa-solid fa-xmark main__header__filters__select-box__search__clear"></i>
        <i class="fa-solid fa-magnifying-glass main__header__filters__select-box__search__search"></i>
      </div>
      <ul class="main__header__filters__select-box__list">
        ${this._filter.list.map((item) => `<li>${item}</li>`).join("")}
      </ul>
    `;
    $wrapper.innerHTML = filterSelectBox;

    const $title = $wrapper.querySelector(
      ".main__header__filters__select-box__title"
    );
    $title.addEventListener("click", () => {
      if ($title.classList.contains("opened")) {
        this.closeFilterSelectBox();
      } else {
        this.openFilterSelectBox();
      }
    });
    return $wrapper;
  }

  getTitleElement(all = false) {
    if (all) {
      return document.querySelectorAll(
        `.main__header__filters__select-box__title`
      );
    }
    return document.querySelector(
      `#${this._filter.id} .main__header__filters__select-box__title`
    );
  }

  getSearchBoxElement(all = false) {
    if (all) {
      return document.querySelectorAll(
        `.main__header__filters__select-box__search`
      );
    }
    return document.querySelector(
      `#${this._filter.id} .main__header__filters__select-box__search`
    );
  }

  getListElement(all = false) {
    if (all) {
      return document.querySelectorAll(
        `.main__header__filters__select-box__list`
      );
    }
    return document.querySelector(
      `#${this._filter.id} .main__header__filters__select-box__list`
    );
  }

  openFilterSelectBox() {
    this.closeAllFilterSelectBox();
    const $search = this.getSearchBoxElement();
    const $list = this.getListElement();
    const $title = this.getTitleElement();
    $title.classList.add("opened");
    $title.style.borderRadius = "11px 11px 0 0";
    $search.style.display = "block";
    $list.style.display = "flex";
  }

  closeFilterSelectBox() {
    const $search = this.getSearchBoxElement();
    const $list = this.getListElement();
    const $title = this.getTitleElement();
    $title.classList.remove("opened");
    $title.style.borderRadius = "11px";
    $search.style.display = "none";
    $list.style.display = "none";
  }

  closeAllFilterSelectBox() {
    const $titles = this.getTitleElement(true);
    $titles.forEach((title) => {
      title.classList.remove("opened");
      title.style.borderRadius = "11px";
    });
    const $search = this.getSearchBoxElement(true);
    $search.forEach((search) => {
      search.style.display = "none";
    });
    const $list = this.getListElement(true);
    $list.forEach((list) => {
      list.style.display = "none";
    });
  }
}
