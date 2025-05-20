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
    this.createFilters(this.filteredRecipes);

    // Recipes
    this.createRecipes(this.filteredRecipes);
  }

  // ------------------- OBSERVER PATTERN -------------------------
  updateSearch(searchTerm, useNativeLoops = false) {
    if (searchTerm.length < 3) {
      this.filteredRecipes = [...this.recipes];
    } else {
      if (useNativeLoops) {
        this.filteredRecipes = [];
        for (const recipe of this.recipes) {
          if (
            recipe.name.toLowerCase().includes(searchTerm) ||
            recipe.description.toLowerCase().includes(searchTerm) ||
            recipe.ingredients.some((ingredient) =>
              ingredient.ingredient.toLowerCase().includes(searchTerm)
            )
          ) {
            this.filteredRecipes.push(recipe);
          }
        }
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
    }
    this.tagsFilteredRecipes = [...this.filteredRecipes];
    this.createRecipes(this.filteredRecipes, searchTerm);
    this.createFilters(this.filteredRecipes);
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

  createFilters(recipes) {
    const $filtersWrapper = document.getElementById("filters");
    $filtersWrapper.innerHTML = "";
    const IngredientsFilterSelectBox = new FilterSelectBox(
      new IngredientsFilter(recipes)
    );
    const AppareilsFilterSelectBox = new FilterSelectBox(
      new AppareilsFilter(recipes)
    );
    const UstensilsFilterSelectBox = new FilterSelectBox(
      new UstensilsFilter(recipes)
    );
    IngredientsFilterSelectBox.subscribe(this);
    AppareilsFilterSelectBox.subscribe(this);
    UstensilsFilterSelectBox.subscribe(this);

    for (const Filter of [
      IngredientsFilterSelectBox,
      AppareilsFilterSelectBox,
      UstensilsFilterSelectBox,
    ]) {
      $filtersWrapper.appendChild(Filter.createFilterSelectBox());
    }
  }

  createRecipes(recipes, textFilter = null) {
    this.updateNumRecipes(recipes.length);
    const $recipesWrapper = document.getElementById("recipes");
    $recipesWrapper.innerHTML = "";
    const recipeCards = recipes.map((recipe) =>
      new RecipeCard(recipe).createRecipeCard()
    );
    for (const recipeCard of recipeCards) {
      $recipesWrapper.appendChild(recipeCard);
    }

    if (recipes.length === 0 && textFilter) {
      const $noRecipesWrapper = document.getElementById("no_recipes");
      $noRecipesWrapper.textContent = `Aucune recette ne contient "${textFilter}", vous pouvez chercher "tarte aux pommes", "poisson", etc.`;
    } else {
      const $noRecipesWrapper = document.getElementById("no_recipes");
      $noRecipesWrapper.textContent = "";
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
