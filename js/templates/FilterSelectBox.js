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
        <i class="fa-solid fa-xmark hidden main__header__filters__select-box__search__clear"></i>
        <i class="fa-solid fa-magnifying-glass main__header__filters__select-box__search__search"></i>
      </div>
    `;
    $wrapper.innerHTML = filterSelectBox;
    $wrapper.appendChild(this.createFilterSelectBoxItems(this._filter.list));

    const $title = $wrapper.querySelector(
      ".main__header__filters__select-box__title"
    );

    const $clear_icon = $wrapper.querySelector(
      ".main__header__filters__select-box__search__clear"
    );

    const $search_input = $wrapper.querySelector(
      ".main__header__filters__select-box__search input"
    );

    $search_input.addEventListener("input", () => {
      const search_value = $search_input.value;
      if (search_value.length > 0) {
        $clear_icon.classList.remove("hidden");
      } else {
        $clear_icon.classList.add("hidden");
      }

      // Contains the items
      const filtered_list = this._filter.list.filter((item) =>
        item.toLowerCase().includes(search_value.toLowerCase())
      );
      // Replace the items
      const $list = $wrapper.querySelector(
        ".main__header__filters__select-box__list"
      );
      $list.innerHTML = filtered_list
        .map((item) => `<li>${item}</li>`)
        .join("");
    });

    $clear_icon.addEventListener("click", () => {
      $search_input.value = "";
      // Focus on the search input
      $search_input.focus();
      $clear_icon.classList.add("hidden");
    });

    $title.addEventListener("click", () => {
      if ($title.classList.contains("opened")) {
        this.closeFilterSelectBox();
      } else {
        this.openFilterSelectBox();
      }
    });

    const $body = document.querySelector("body");
    $body.addEventListener("click", (e) => {
      if (!e.target.closest(".main__header__filters__select-box")) {
        this.closeAllFilterSelectBox();
      }
    });
    return $wrapper;
  }

  createFilterSelectBoxItems(items) {
    const $wrapper = document.createElement("div");
    $wrapper.classList.add("main__header__filters__select-box__list");
    $wrapper.setAttribute("id", this._filter.id);
    const filterSelectBoxItems = `
      ${items.map((item) => `<li>${item}</li>`).join("")}
    `;
    $wrapper.innerHTML = filterSelectBoxItems;
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

  changeChevronIcon() {
    const $title = this.getTitleElement();
    $title.querySelector("i").classList.toggle("fa-chevron-down");
    $title.querySelector("i").classList.toggle("fa-chevron-up");
  }

  openFilterSelectBox() {
    this.closeAllFilterSelectBox();
    const $search = this.getSearchBoxElement();
    const $list = this.getListElement();
    const $title = this.getTitleElement();
    this.changeChevronIcon();
    $title.classList.add("opened");
    $title.style.borderRadius = "11px 11px 0 0";
    $search.style.display = "block";
    $list.style.display = "flex";
  }

  closeFilterSelectBox() {
    const $search = this.getSearchBoxElement();
    const $list = this.getListElement();
    const $title = this.getTitleElement();
    this.changeChevronIcon();
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
      title.querySelector("i").classList.remove("fa-chevron-up");
      title.querySelector("i").classList.add("fa-chevron-down");
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
