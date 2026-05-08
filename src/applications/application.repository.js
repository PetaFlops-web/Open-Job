import pg from "pg";
import { nanoid } from "nanoid";

class ApplicationsRepository {
  constructor() {
    this._pool = new pg.Pool();
  }

  async addNewApplication(payload) {
    const idApplication = `application-${nanoid(16)}`;
    const query = {
      text: `INSERT INTO application(id, job_id, user_id, status) 
           VALUES($1, $2, $3, $4) RETURNING id, job_id, user_id, status`,
      values: [idApplication, payload.job_id, payload.user_id, "pending"],
    };
    const result = await this._pool.query(query);
    return result.rows[0];
  }

  async checkDuplicateApplication(job_id, user_id) {
    const query = {
      text: "SELECT id FROM application WHERE job_id = $1 AND user_id = $2",
      values: [job_id, user_id],
    };
    const result = await this._pool.query(query);
    return result.rows[0];
  }

  async getAllApplications() {
    const query = "SELECT * FROM application";
    const result = await this._pool.query(query);
    return result.rows;
  }

  async getApplicationById(id) {
    const query = {
      text: "SELECT * FROM application WHERE id = $1",
      values: [id],
    };
    const result = await this._pool.query(query);
    return result.rows[0];
  }

  async getApplicationByUserId(id) {
    const query = {
      text: "SELECT * FROM application WHERE user_id = $1",
      values: [id],
    };
    const result = await this._pool.query(query);
    return result.rows;
  }

  async getApplicationByJobId(id) {
    const query = {
      text: "SELECT * FROM application WHERE job_id = $1",
      values: [id],
    };
    const result = await this._pool.query(query);
    return result.rows;
  }

  async updateApplicationById(id, payload) {
    const query = {
      text: "UPDATE application SET user_id = COALESCE($1, user_id), job_id = COALESCE($2, job_id), status = COALESCE($3, status) WHERE id = $4",
      values: [
        payload.user_id ?? null,
        payload.job_id ?? null,
        payload.status ?? null,
        id,
      ],
    };

    const result = await this._pool.query(query);
    return result.rows[0]?.id;
  }

  async deleteApplicationById(id) {
    const query = {
      text: "DELETE FROM application WHERE id = $1 RETURNING id",
      values: [id],
    };
    const result = await this._pool.query(query);
    return result.rows[0]?.id;
  }
}

export default new ApplicationsRepository();
