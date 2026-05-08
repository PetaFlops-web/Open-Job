import pg from "pg";
import { nanoid } from "nanoid";
import CacheService from "../cache/redis.service.js";
class CompaniesRepository {
  constructor() {
    this._pool = new pg.Pool();
    this._cache = new CacheService();
  }

  async addNewCompany(payload) {
    const idCompany = `company-${nanoid(16)}`;

    const query = {
      text: "INSERT INTO companies(id, name, location, description, user_id) VALUES($1, $2, $3, $4, $5) RETURNING id",
      values: [
        idCompany,
        payload.name,
        payload.location,
        payload.description,
        payload.user_id,
      ],
    };

    const result = await this._pool.query(query);
    return result.rows[0].id;
  }

  async updateCompanyById(id, payload) {
    const query = {
      text: "UPDATE companies SET name = $1, location = $2, description = $3 WHERE id = $4 RETURNING id",
      values: [payload.name, payload.location, payload.description, id],
    };
    const result = await this._pool.query(query);

    if (!result.rows[0]?.id) return null;

    await this._cache.delete(`company-${id}`); // hapus, bukan set!

    return result.rows[0]?.id;
  }

  async deleteCompanyById(id) {
    const query = {
      text: "DELETE FROM companies WHERE id = $1 RETURNING id",
      values: [id],
    };

    const result = await this._pool.query(query);
    return result.rows[0]?.id;
  }

  async getAllCompanies() {
    const query = "SELECT * FROM companies";
    const result = await this._pool.query(query);
    return result.rows;
  }

  async getCompanyById(id) {
    const query = {
      text: "SELECT * FROM companies WHERE id = $1",
      values: [id],
    };

    const result = await this._pool.query(query);

    if (!result.rows[0]) {
      return null;
    }

    await this._cache.set(`company-${id}`, JSON.stringify(result.rows[0]));

    return result.rows[0];
  }
}

export default new CompaniesRepository();
