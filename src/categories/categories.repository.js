import pg from "pg";
import { nanoid } from "nanoid";

class CatgoriesRepository {
  constructor() {
    this._pool = new pg.Pool();
  }

  async addNewCategory(payload) {
    const idCategory = `category-${nanoid(16)}`;

    const query = {
      text: "INSERT INTO categories(id, name) VALUES($1, $2) RETURNING id",
      values: [idCategory, payload.name],
    };

    const result = await this._pool.query(query);
    return result.rows[0].id;
  }

  async updateCategoryById(id, payload) {
    const query = {
      text: "UPDATE categories SET name = $1 WHERE id = $2 RETURNING id",
      values: [payload.name, id],
    };

    const result = await this._pool.query(query);
    return result.rows[0]?.id;
  }

  async getAllCategories() {
    const query = "SELECT * FROM categories";
    const result = await this._pool.query(query);
    return result.rows;
  }

  async getCategoryById(id) {
    const query = {
      text: "SELECT * FROM categories WHERE id = $1",
      values: [id],
    };
    const result = await this._pool.query(query);
    return result.rows[0];
  }

  async deleteCategoryById(id) {
    const query = {
      text: "DELETE FROM categories WHERE id = $1 RETURNING id",
      values: [id],
    };
    const result = await this._pool.query(query);
    return result.rows[0]?.id;
  }
}

export default new CatgoriesRepository();
