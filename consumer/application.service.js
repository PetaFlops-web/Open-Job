import { Pool } from "pg";

class ApplicationService {
  constructor() {
    this._pool = new Pool();
  }

  async getApplicationWithJobOwner(applicationId) {
    const query = {
      text: `
    SELECT 
    application.id,
    applicant.email         AS applicant_email,
    applicant.name          AS applicant_name,
    application.updated_at  AS applied_at,
    owner.email             AS owner_email
    FROM application
    JOIN users AS applicant ON application.user_id = applicant.id
    JOIN jobs               ON application.job_id  = jobs.id
    JOIN companies          ON jobs.company_id     = companies.id
    JOIN users AS owner     ON companies.user_id   = owner.id
    WHERE application.id = $1
  `,
      values: [applicationId],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new Error(`Application ${applicationId} tidak ditemukan`);
    }

    return result.rows[0];
  }
}

export default ApplicationService;
