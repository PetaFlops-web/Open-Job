import { Pool } from "pg";
import bcrypt from "bcryptjs";
class AuthenticationRepository {
  constructor() {
    this._pool = new Pool();
  }

  async token(token) {
    const query = {
      text: "INSERT INTO authentication VALUES($1)",
      values: [token],
    };
    await this._pool.query(query);
  }

  async verifyUserCredential({ email, password }) {
    const query = {
      text: "SELECT id, password FROM users WHERE email = $1",
      values: [email],
    };
    const result = await this._pool.query(query);
    if (!result.rows.length) {
      return false;
    }

    const { id, password: hashedPassword } = result.rows[0];
    const match = await bcrypt.compare(password, hashedPassword);
    if (!match) {
      return false;
    }

    return id;
  }

  async verifyRefreshToken(refreshToken) {
    const query = {
      text: "SELECT * FROM authentication WHERE token = $1",
      values: [refreshToken],
    };
    const result = await this._pool.query(query);
    return result.rows[0];
  }

  async deleteRefreshToken(refreshToken) {
    const query = {
      text: "DELETE FROM authentication WHERE token = $1",
      values: [refreshToken],
    }
    await this._pool.query(query);
  }
}

export default new AuthenticationRepository();
