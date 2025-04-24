class App {
  constructor() {
    this.recipeApi = new RecipeApi("./data/recipes.json");
    this.recipes = [];
    this.filteredRecipes = [];
    this.tagsFilteredRecipes = [];
    this.numRecipes = 0;
  }

  async main() {
    const recipesData = await this.recipeApi.getRecipes();
    this.recipes = recipesData.map((recipe) => new Recipe(recipe));
    this.filteredRecipes = [...this.recipes];
    this.tagsFilteredRecipes = [...this.recipes];
    // Search bar
    const searchBar = new SearchBar();
    searchBar.subscribe(this);
    this.createSearchBar(searchBar);

    // Filters
    const IngredientsFilterSelectBox = new FilterSelectBox(
      new IngredientsFilter(this.recipes)
    );
    const AppareilsFilterSelectBox = new FilterSelectBox(
      new AppareilsFilter(this.recipes)
    );
    const UstensilsFilterSelectBox = new FilterSelectBox(
      new UstensilsFilter(this.recipes)
    );
    IngredientsFilterSelectBox.subscribe(this);
    AppareilsFilterSelectBox.subscribe(this);
    UstensilsFilterSelectBox.subscribe(this);
    this.createFilters([
      IngredientsFilterSelectBox,
      AppareilsFilterSelectBox,
      UstensilsFilterSelectBox,
    ]);

    // Recipes
    this.createRecipes(this.filteredRecipes);
  }

  // ------------------- OBSERVER PATTERN -------------------------
  updateSearch(searchTerm) {
    if (searchTerm.length < 3) {
      this.filteredRecipes = [...this.recipes];
    } else {
      this.filteredRecipes = this.recipes.filter(
        (recipe) =>
          recipe.name.toLowerCase().includes(searchTerm) ||
          recipe.description.toLowerCase().includes(searchTerm) ||
          recipe.ingredients.some((ingredient) =>
            ingredient.ingredient.toLowerCase().includes(searchTerm)
          )
      );
    }
    this.tagsFilteredRecipes = [...this.filteredRecipes];
    this.createRecipes(this.filteredRecipes);
    this.createFilters(this.filteredRecipes, [
      IngredientsFilter,
      AppareilsFilter,
      UstensilsFilter,
    ]);
  }

  updateFilter(selectedItems, filterName) {
    if (selectedItems.length === 0) {
      this.tagsFilteredRecipes = [...this.filteredRecipes];
    } else if (filterName === "ingredients") {
      this.tagsFilteredRecipes = this.filteredRecipes.filter((recipe) =>
        selectedItems.some((item) =>
          recipe.ingredients
            .map((ingredient) => ingredient.ingredient.toLowerCase())
            .includes(item.toLowerCase())
        )
      );
    } else if (filterName === "appareils") {
      this.tagsFilteredRecipes = this.filteredRecipes.filter((recipe) =>
        selectedItems.some((item) =>
          recipe.appliance.toLowerCase().includes(item.toLowerCase())
        )
      );
    } else if (filterName === "ustensiles") {
      this.tagsFilteredRecipes = this.filteredRecipes.filter((recipe) =>
        selectedItems.some((item) =>
          recipe.ustensils
            .map((ustensil) => ustensil.toLowerCase())
            .includes(item.toLowerCase())
        )
      );
    }
    this.createRecipes(this.tagsFilteredRecipes);
  }
  // ------------------- CREATE ELEMENTS -------------------------
  createSearchBar(searchBar) {
    const $heroHeaderWrapper = document.getElementById("hero_header");
    const searchBarElement = searchBar.createSearchBar();
    $heroHeaderWrapper.appendChild(searchBarElement);
  }

  createFilters(Filters) {
    const $filtersWrapper = document.getElementById("filters");
    $filtersWrapper.innerHTML = "";
    for (const Filter of Filters) {
      $filtersWrapper.appendChild(Filter.createFilterSelectBox());
    }
  }

  createRecipes(recipes) {
    this.updateNumRecipes(recipes.length);
    const $recipesWrapper = document.getElementById("recipes");
    $recipesWrapper.innerHTML = "";
    const recipeCards = recipes.map((recipe) =>
      new RecipeCard(recipe).createRecipeCard()
    );
    for (const recipeCard of recipeCards) {
      $recipesWrapper.appendChild(recipeCard);
    }
  }

  updateNumRecipes(numRecipes) {
    this.numRecipes = numRecipes;
    const $numRecipesWrapper = document.getElementById("num_recipes");
    $numRecipesWrapper.textContent = `${this.numRecipes} recettes`;
  }
}

const app = new App();
app.main();
