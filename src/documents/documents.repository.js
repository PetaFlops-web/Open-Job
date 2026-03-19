import pg from "pg";
import { nanoid } from "nanoid";

class DocumentsRepository {
  constructor() {
    this._pool = new pg.Pool();
  }

  async addNewDocument(payload) {
    const idDocument = `document-${nanoid(16)}`;
    const query = {
      text: "INSERT INTO documents(id, file_url) VALUES($1, $2) RETURNING id",
      values: [idDocument, payload.file_url],
    };
    const result = await this._pool.query(query);
    return result.rows[0].id;
  }

  async getAllDocuments() {
    const query = "SELECT * FROM documents";
    const result = await this._pool.query(query);
    return result.rows;
  }

  async getDocumentById(id) {
    const query = {
      text: "SELECT * FROM documents WHERE id = $1",
      values: [id],
    };
    const result = await this._pool.query(query);
    return result.rows[0];
  }

  async deleteDocumentById(id) {
    const query = {
      text: "DELETE FROM documents WHERE id = $1 RETURNING id",
      values: [id],
    };
    const result = await this._pool.query(query);
    return result.rows[0].id;
  }
}

export default new DocumentsRepository();
