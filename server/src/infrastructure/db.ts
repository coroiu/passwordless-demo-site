import { readFile, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";

const filepath = "./data.json";

export interface User {
  userId: string;
  email: string;
  name: string;
}

export interface Database {
  users: User[];
}

export class DatabaseRepository {
  static async init(): Promise<DatabaseRepository> {
    let db;
    if (!existsSync(filepath)) {
      await writeFile(filepath, JSON.stringify({ users: [] }));
    }

    db = JSON.parse(await readFile(filepath, { encoding: "utf-8" }));
    return new DatabaseRepository(db);
  }

  private constructor(readonly db: Database) {}

  async save() {
    await writeFile(filepath, JSON.stringify(this.db));
  }
}
