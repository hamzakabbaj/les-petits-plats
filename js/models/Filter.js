class Filter {
  constructor(data, label, id) {
    this._data = data;
    this._list = [];
    this._label = label;
    this._id = id;
  }

  list_filter_elements() {
    return [];
  }

  get list() {
    return this._list;
  }

  get label() {
    return this._label;
  }

  get id() {
    return this._id;
  }
}

class IngredientsFilter extends Filter {
  constructor(data) {
    super(data, "Ingrédients", "ingredients");
    this._list = this.list_filter_elements();
  }

  list_filter_elements() {
    let allIngredients = this._data.flatMap((recipe) =>
      recipe.ingredients.map((ingredient) => ingredient.ingredient)
    );

    allIngredients = allIngredients.map(
      (ingredient) => ingredient.charAt(0).toUpperCase() + ingredient.slice(1)
    );

    return [...new Set(allIngredients)];
  }
}

class UstensilsFilter extends Filter {
  constructor(data) {
    super(data, "Ustensiles", "ustensiles");
    this._list = this.list_filter_elements();
  }

  list_filter_elements() {
    let allUstensils = this._data.flatMap((recipe) => recipe.ustensils);

    allUstensils = allUstensils.map(
      (ustensil) => ustensil.charAt(0).toUpperCase() + ustensil.slice(1)
    );

    return [...new Set(allUstensils)];
  }
}

class AppareilsFilter extends Filter {
  constructor(data) {
    super(data, "Appareils", "appareils");
    this._list = this.list_filter_elements();
  }

  list_filter_elements() {
    let allAppareils = this._data.map((recipe) => recipe.appliance);

    allAppareils = allAppareils.map(
      (appareil) => appareil.charAt(0).toUpperCase() + appareil.slice(1)
    );

    return [...new Set(allAppareils)];
  }
}
