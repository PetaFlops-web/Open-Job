import pg from "pg";

class ProfileRepository {
    constructor() {
        this._pool = new pg.Pool();
    }

    async getProfileByUserId(userId) {
        const query = {
            text: "SELECT * FROM users WHERE id = $1",
            values: [userId],
        };

        const result = await this._pool.query(query);
        return result.rows[0];
    }

    async getProfileUserApplications(userId) {
        const query = {
            text: "SELECT * FROM application WHERE user_id = $1",
            values: [userId],
        };

        const result = await this._pool.query(query);
        return result.rows;
    }

    async getProfileBookmarkedJobs(userId) {
        const query = {
            text: "SELECT * FROM bookmark WHERE user_id = $1",
            values: [userId],
        };

        const result = await this._pool.query(query);
        return result.rows;
    }
}

export default new ProfileRepository();