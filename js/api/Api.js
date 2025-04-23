class Api {
  /**
   *
   * @param {string} url
   */
  constructor(url) {
    this._url = url;
  }

  async get() {
    console.log(this._url);
    return fetch(this._url)
      .then((res) => res.json())
      .then((res) => res.data)
      .catch((err) => console.log("an error occurs", err));
  }
}

class RecipeApi extends Api {
  constructor(url) {
    super(url);
  }

  async getRecipes() {
    return await this.get();
  }
}
