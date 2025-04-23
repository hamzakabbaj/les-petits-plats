class App {
  constructor() {
    this.$recipesWrapper = document.getElementById("recipes");
    this.recipeApi = new RecipeApi("./data/recipes.json");
  }

  async main() {
    const recipesData = await this.recipeApi.getRecipes();
    console.log(recipesData);

    const recipes = recipesData.map((recipe) => new Recipe(recipe));
    console.log(recipes);

    const recipeCards = recipes.map((recipe) =>
      new RecipeCard(recipe).createRecipeCard()
    );

    console.log(recipeCards);

    for (const recipeCard of recipeCards) {
      this.$recipesWrapper.appendChild(recipeCard);
    }
  }
}

const app = new App();
app.main();
