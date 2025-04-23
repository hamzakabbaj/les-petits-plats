class RecipeCard {
  constructor(recipe) {
    this._recipe = recipe;
  }

  createRecipeCard() {
    const $wrapper = document.createElement("div");
    $wrapper.classList.add("main__recipes__recipe-card");
    const recipeCard = `
      <div class="main__recipes__recipe-card__image">
        <img src="${this._recipe.image}" alt="${this._recipe.name}">
      </div>
      <div class="main__recipes__recipe-card__time">
        <span>${this._recipe.time}</span>
      </div>
      <div class="main__recipes__recipe-card__title">
        <h3>${this._recipe.name}</h3>
      </div>
      <div class="main__recipes__recipe-card__description">
        <h4>Recette</h4>
        <p>${this._recipe.description}</p>
      </div>
      <div class="main__recipes__recipe-card__ingredients">
        <h4>Ingrédients</h4>
        <div class="main__recipes__recipe-card__ingredients__list">
          ${this._recipe.ingredients
            .map(
              (
                ingredient
              ) => `<div class="main__recipes__recipe-card__ingredients__list__item">
            <span class="main__recipes__recipe-card__ingredients__list__item__ingredient">${ingredient.ingredient}</span>
            <span class="main__recipes__recipe-card__ingredients__list__item__quantity">${ingredient.quantity} ${ingredient.unit}</span>
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
