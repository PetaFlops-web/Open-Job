import { Pool } from "pg";
import bcrypt from "bcryptjs";
import { nanoid } from "nanoid";

class UserRepository {
  constructor() {
    this._pool = new Pool();
  }
  async addNewUser(payload) {
    const idUser = `user-${nanoid(16)}`;

    const salt = await bcrypt.genSalt(10);
    payload.password = await bcrypt.hash(payload.password, salt);

    const query = {
      text: "INSERT INTO users(name, email, password, role, id) VALUES($1, $2, $3, $4, $5) RETURNING id",
      values: [
        payload.name,
        payload.email,
        payload.password,
        payload.role,
        idUser,
      ],
    };

    const result = await this._pool.query(query);
    return result.rows[0].id;
  }

  async checkUserEmail(email) {
    const query = {
      text: "SELECT * FROM users WHERE email = $1",
      values: [email],
    };
    const result = await this._pool.query(query);
    return result.rows[0];
  }

  async getUserById(id) {
    const query = {
      text: "SELECT * FROM users WHERE id = $1",
      values: [id],
    };
    const result = await this._pool.query(query);
    return result.rows[0];
  }
}

export default new UserRepository();
