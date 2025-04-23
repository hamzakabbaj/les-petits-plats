class FilterSelectBox {
  constructor(filter) {
    this._filter = filter;
  }

  createFilterSelectBox() {
    const $wrapper = document.createElement("div");
    $wrapper.classList.add("main__header__filters__select-box");
    const filterSelectBox = `
      <div class="main__header__filters__select-box__title">
        <span>${this._filter.label}</span>
        <i class="fa-solid fa-chevron-down"></i>
      </div>
      <ul class="main__header__filters__select-box__list">
        ${this._filter.list.map((item) => `<li>${item}</li>`).join("")}
      </ul>
    `;
    $wrapper.innerHTML = filterSelectBox;
    return $wrapper;
  }
}
