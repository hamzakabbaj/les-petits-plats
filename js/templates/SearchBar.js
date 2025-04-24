class SearchBar {
  constructor() {
    this._input = null;
    this._observers = [];
  }

  // ------------------- OBSERVER PATTERN -------------------------
  subscribe(observer) {
    this._observers.push(observer);
  }

  unsubscribe(observer) {
    this._observers = this._observers.filter((obs) => obs !== observer);
  }

  notify(searchTerm) {
    console.log("NOTIFYING");
    this._observers.forEach((observer) => observer.update(searchTerm));
  }

  // ------------------- ELEMENTS -------------------------

  createSearchBar() {
    const $wrapper = document.createElement("div");
    $wrapper.classList.add("hero_header__searchbar");
    $wrapper.innerHTML = `
      <input
          type="text"
          placeholder="Rechercher une recette, un ingrédient, ..."
      />
      <button class="hero_header__searchbar__button">
        <i class="fa-solid fa-magnifying-glass"></i>
      </button>
      <span class="hero_header__searchbar__clear">
        <i class="fa-solid fa-xmark"></i>
      </span>
    `;

    this.addEventsListeners($wrapper);
    return $wrapper;
  }

  // ------------------- EVENTS -------------------------

  addEventsListeners($wrapper) {
    const $input = $wrapper.querySelector("input");
    const $clear = $wrapper.querySelector(".hero_header__searchbar__clear");

    this.addSearchBarListener($input, $clear);
    this.addClearListener($clear, $input);
  }

  addSearchBarListener($input, $clear) {
    $input.addEventListener("input", () => {
      if ($input.value.length > 0) {
        $clear.style.display = "block";
        this.notify($input.value.toLowerCase());
      } else {
        $clear.style.display = "none";
        this.notify("");
      }
    });
  }

  addClearListener($clear, $input) {
    $clear.addEventListener("click", () => {
      $input.value = "";
      $clear.style.display = "none";
      this.notify("");
    });
  }
}
