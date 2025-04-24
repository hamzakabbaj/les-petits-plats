class App {
  constructor() {
    this.recipeApi = new RecipeApi("./data/recipes.json");
    this.recipes = [];
    this.filteredRecipes = [];
  }

  async main() {
    const recipesData = await this.recipeApi.getRecipes();
    this.recipes = recipesData.map((recipe) => new Recipe(recipe));
    this.filteredRecipes = [...this.recipes];

    // Search bar
    const searchBar = new SearchBar();
    searchBar.subscribe(this);
    this.createSearchBar(searchBar);

    // Filters
    this.createFilters(this.recipes, [
      IngredientsFilter,
      AppareilsFilter,
      UstensilsFilter,
    ]);

    // Recipes
    this.createRecipes(this.filteredRecipes);
  }

  // ------------------- OBSERVER PATTERN -------------------------
  update(searchTerm) {
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
    this.createRecipes(this.filteredRecipes);
    this.createFilters(this.filteredRecipes, [
      IngredientsFilter,
      AppareilsFilter,
      UstensilsFilter,
    ]);
  }

  // ------------------- CREATE ELEMENTS -------------------------
  createSearchBar(searchBar) {
    const $heroHeaderWrapper = document.getElementById("hero_header");
    const searchBarElement = searchBar.createSearchBar();
    $heroHeaderWrapper.appendChild(searchBarElement);
  }

  createFilters(recipes, Filters) {
    const $filtersWrapper = document.getElementById("filters");
    $filtersWrapper.innerHTML = "";
    for (const Filter of Filters) {
      const filter = new Filter(recipes);
      const filterSelectBox = new FilterSelectBox(
        filter
      ).createFilterSelectBox();
      $filtersWrapper.appendChild(filterSelectBox);
    }
  }

  createRecipes(recipes) {
    const $recipesWrapper = document.getElementById("recipes");
    $recipesWrapper.innerHTML = "";
    const recipeCards = recipes.map((recipe) =>
      new RecipeCard(recipe).createRecipeCard()
    );
    for (const recipeCard of recipeCards) {
      $recipesWrapper.appendChild(recipeCard);
    }
  }
}

const app = new App();
app.main();
