class FilterSelectBox {
  constructor(filter) {
    this._filter = filter;
    this._selected_items = [];
  }

  // ------------------ ELEMENTS ------------------------

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

    this.addEventsListeners($wrapper);

    return $wrapper;
  }

  createFilterSelectBoxItems(items) {
    const $wrapper = document.createElement("div");
    $wrapper.classList.add("main__header__filters__select-box__list");
    $wrapper.setAttribute("id", this._filter.id);
    const filterSelectBoxItems = `
      ${items
        .map((item) =>
          this._selected_items.includes(item)
            ? `<li class="selected">${item}<i class="fa-solid fa-xmark"></i></li>`
            : `<li>${item}<i class="fa-solid fa-xmark"></i></li>`
        )
        .join("")}
    `;
    $wrapper.innerHTML = filterSelectBoxItems;
    return $wrapper;
  }

  // ------------------- EVENTS -------------------------
  addEventsListeners($wrapper) {
    const $title = this.getTitleElement($wrapper);
    const $clear_icon = this.getSearchBoxClearIconElement($wrapper);
    const $search_input = this.getSearchBoxInputElement($wrapper);
    const $search_items = this.getSearchItemsElements($wrapper);
    const $body = document.querySelector("body");

    console.log($search_items);

    this.addItemsClickListener($search_items);
    this.addSearchInputListener($search_input, $clear_icon, $wrapper);
    this.addClearIconClickListener($clear_icon, $search_input);
    this.addChevronIconClickListener($title);
    this.addBodyClickListener($body);
  }

  addSearchInputListener($search_input, $clear_icon, $wrapper) {
    $search_input.addEventListener("input", () => {
      const search_value = $search_input.value;
      console.log(search_value);
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
      this.setSearchItems(filtered_list, $wrapper);
    });
  }

  addItemsClickListener($search_items) {
    $search_items.forEach((item) => {
      item.addEventListener("click", (e) => {
        // If doesn't have the class selected, add it
        if (!item.classList.contains("selected")) {
          item.classList.add("selected");
          this._selected_items.push(item.textContent);
        }
      });
    });
  }

  addClearIconClickListener($clear_icon, $search_input, $wrapper) {
    $clear_icon.addEventListener("click", () => {
      $search_input.value = "";
      // Focus on the search input
      $search_input.focus();
      $clear_icon.classList.add("hidden");
      this.setSearchItems(this._filter.list, $wrapper);
    });
  }

  addChevronIconClickListener($title) {
    $title.addEventListener("click", () => {
      if ($title.classList.contains("opened")) {
        this.closeFilterSelectBox();
      } else {
        this.openFilterSelectBox();
      }
    });
  }

  addBodyClickListener($body) {
    $body.addEventListener("click", (e) => {
      if (!e.target.closest(".main__header__filters__select-box")) {
        this.closeAllFilterSelectBox();
      }
    });
  }

  //----------------------- ACTIONS -----------------------
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
    const $titles = this.getAllTitleElements();
    $titles.forEach((title) => {
      title.classList.remove("opened");
      title.style.borderRadius = "11px";
      title.querySelector("i").classList.remove("fa-chevron-up");
      title.querySelector("i").classList.add("fa-chevron-down");
    });
    const $search = this.getAllSearchBoxElements();
    $search.forEach((search) => {
      search.style.display = "none";
    });
    const $list = this.getAllListElements();
    $list.forEach((list) => {
      list.style.display = "none";
    });
  }

  setSearchItems(items, $wrapper) {
    const $list = this.getListElement($wrapper);
    $list.innerHTML = items.map((item) => `<li>${item}</li>`).join("");
  }

  // ------------------- GETTERS ------------------------

  getAllTitleElements() {
    return document.querySelectorAll(
      `.main__header__filters__select-box__title`
    );
  }

  getTitleElement(wrapper = null) {
    if (wrapper) {
      return wrapper.querySelector(`.main__header__filters__select-box__title`);
    }
    return document.querySelector(
      `#${this._filter.id} .main__header__filters__select-box__title`
    );
  }

  getAllSearchBoxElements() {
    return document.querySelectorAll(
      `.main__header__filters__select-box__search`
    );
  }

  getSearchBoxInputElement(wrapper = null) {
    if (wrapper) {
      return wrapper.querySelector(
        `.main__header__filters__select-box__search input`
      );
    }
    return document.querySelector(
      `#${this._filter.id} .main__header__filters__select-box__search input`
    );
  }

  getSearchBoxElement(wrapper = null) {
    if (wrapper) {
      return wrapper.querySelector(
        `.main__header__filters__select-box__search`
      );
    }
    return document.querySelector(
      `#${this._filter.id} .main__header__filters__select-box__search`
    );
  }

  getSearchBoxClearIconElement(wrapper = null) {
    if (wrapper) {
      return wrapper.querySelector(
        `.main__header__filters__select-box__search__clear`
      );
    }
    return document.querySelector(
      `#${this._filter.id} .main__header__filters__select-box__search__clear`
    );
  }

  getAllListElements() {
    return document.querySelectorAll(
      `.main__header__filters__select-box__list`
    );
  }

  getListElement(wrapper = null) {
    if (wrapper) {
      return wrapper.querySelector(`.main__header__filters__select-box__list`);
    }
    return document.querySelector(
      `#${this._filter.id} .main__header__filters__select-box__list`
    );
  }

  getSearchItemsElements(wrapper = null) {
    if (wrapper) {
      return wrapper.querySelectorAll(
        `.main__header__filters__select-box__list li`
      );
    }
    return document.querySelectorAll(
      `#${this._filter.id} .main__header__filters__select-box__list li`
    );
  }
}
