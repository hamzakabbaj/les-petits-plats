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
    return $wrapper;
  }
}
