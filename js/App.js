class App {
  constructor() {
    this.$recipesWrapper = document.getElementById("recipes");
    this.$filtersWrapper = document.getElementById("filters");
    this.$heroHeaderWrapper = document.getElementById("hero_header");
    this.recipeApi = new RecipeApi("./data/recipes.json");
  }

  async main() {
    const recipesData = await this.recipeApi.getRecipes();
    const recipes = recipesData.map((recipe) => new Recipe(recipe));

    // Search bar
    const searchBar = new SearchBar().createSearchBar();
    this.$heroHeaderWrapper.appendChild(searchBar);

    // Filters
    const Filters = [IngredientsFilter, AppareilsFilter, UstensilsFilter];

    for (const Filter of Filters) {
      const filter = new Filter(recipes);
      const filterSelectBox = new FilterSelectBox(
        filter
      ).createFilterSelectBox();
      this.$filtersWrapper.appendChild(filterSelectBox);
    }

    // Recipes
    const recipeCards = recipes.map((recipe) =>
      new RecipeCard(recipe).createRecipeCard()
    );
    for (const recipeCard of recipeCards) {
      this.$recipesWrapper.appendChild(recipeCard);
    }
  }
}

const app = new App();
app.main();
