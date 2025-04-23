class RecipeCard {
  constructor(recipe) {
    this._recipe = recipe;
  }

  createRecipeCard() {
    const $wrapper = document.createElement("div");
    $wrapper.classList.add("recipe-card");
    const recipeCard = `
      <div class="recipe-card__image">
        <img src="${this._recipe.image}" alt="${this._recipe.name}">
      </div>
      <div class="recipe-card__time">
        <span>${this._recipe.time} min</span>
      </div>
      <div class="recipe-card__title">
        <h3>${this._recipe.name}</h3>
      </div>
      <div class="recipe-card__description">
        <h4>Recette</h4>
        <p>${this._recipe.description}</p>
      </div>
      <div class="recipe-card__ingredients">
        <h4>Ingrédients</h4>
        <div class="recipe-card__ingredients__list">
          ${this._recipe.ingredients
            .map(
              (
                ingredient
              ) => `<div class="recipe-card__ingredients__list__item">
            <span class="recipe-card__ingredients__list__item__ingredient">${ingredient.ingredient}</span>
            <span class="recipe-card__ingredients__list__item__quantity">${ingredient.quantity} ${ingredient.unit}</span>
          </div>`
            )
            .join("")}
        </div>
      </div>
    `;
    $wrapper.innerHTML = recipeCard;
    return $wrapper;
  }
}
