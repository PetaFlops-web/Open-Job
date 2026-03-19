import pg from "pg";
import { nanoid } from "nanoid";

class JobsRepository {
  constructor() {
    this._pool = new pg.Pool();
  }

  async addNewJob(payload) {
    const idJob = `job-${nanoid(16)}`;
    const query = {
      text: "INSERT INTO jobs(id, company_id, category_id, title, description, job_type, experience_level, location_type, location_city, salary_min, salary_max, is_salary_visible, status) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING id",
      values: [
        idJob,
        payload.company_id,
        payload.category_id,
        payload.title,
        payload.description,
        payload.job_type,
        payload.experience_level,
        payload.location_type,
        payload.location_city,
        payload.salary_min,
        payload.salary_max,
        payload.is_salary_visible,
        payload.status,
      ],
    };

    const result = await this._pool.query(query);
    return result.rows[0].id;
  }

  async updateJobById(id, payload) {
    const query = {
      text: `UPDATE jobs SET
      company_id = COALESCE($1, company_id),
      category_id = COALESCE($2, category_id),
      title = COALESCE($3, title),
      description = COALESCE($4, description),
      job_type = COALESCE($5, job_type),
      experience_level = COALESCE($6, experience_level),
      location_type = COALESCE($7, location_type),
      location_city = COALESCE($8, location_city),
      salary_min = COALESCE($9, salary_min),
      salary_max = COALESCE($10, salary_max),
      is_salary_visible = COALESCE($11, is_salary_visible),
      status = COALESCE($12, status)
      WHERE id = $13 RETURNING id`,
      values: [
        payload.company_id ?? null,
        payload.category_id ?? null,
        payload.title ?? null,
        payload.description ?? null,
        payload.job_type ?? null,
        payload.experience_level ?? null,
        payload.location_type ?? null,
        payload.location_city ?? null,
        payload.salary_min ?? null,
        payload.salary_max ?? null,
        payload.is_salary_visible ?? null,
        payload.status ?? null,
        id,
      ],
    };

    const result = await this._pool.query(query);
    return result.rows[0]?.id;
  }

  async deleteJobById(id) {
    const query = {
      text: "DELETE FROM jobs WHERE id = $1 RETURNING id",
      values: [id],
    };

    const result = await this._pool.query(query);
    return result.rows[0]?.id;
  }

  async getAllJobs() {
    const query = "SELECT * FROM jobs";
    const result = await this._pool.query(query);
    return result.rows;
  }

  async getJobsByCompany(id) {
    const query = {
      text: "SELECT * FROM jobs WHERE company_id = $1",
      values: [id],
    };
    const result = await this._pool.query(query);
    return result.rows;
  }

  async getJobByCategory(id) {
    const query = {
      text: "SELECT * FROM jobs WHERE category_id = $1",
      values: [id],
    };
    const result = await this._pool.query(query);
    return result.rows;
  }

  async getJobById(id) {
    const query = {
      text: "SELECT id,title FROM jobs WHERE id = $1",
      values: [id],
    };
    const result = await this._pool.query(query);
    return result.rows[0];
  }
}

export default new JobsRepository();
