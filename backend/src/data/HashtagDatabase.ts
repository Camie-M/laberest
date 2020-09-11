import { BaseDatabase } from "./BaseDatabase";
import { HashtagsArray } from "../model/HashtagsArray";
import { IdGenerator } from "../services/IdGenerator";

export class HashtagDatabase extends BaseDatabase {
  private static TABLE_NAME = "LABEREST_HASHTAGS";

  private toModel(dbModel?: any): HashtagsArray | undefined {
    return dbModel && new HashtagsArray(dbModel.name);
  }

  public async createHashtag(tag: HashtagsArray): Promise<void> {
    try {
      const knex = this.getConnection();

      const generateId = new IdGenerator();

      const tagsArray: string[] = tag.getNames();

      for (let item of tagsArray) {
        const id = generateId.generate();

        await knex
          .insert({ id: id, name: item })
          .into(HashtagDatabase.TABLE_NAME);
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  public async getHashtagById(id: string): Promise<string> {
    const result = await this.getConnection()
      .select("*")
      .from(HashtagDatabase.TABLE_NAME)
      .where({ id });

    return result[0];
  }

  public async getHashtagByName(name: string): Promise<string> {
    const result = await this.getConnection()
      .select("name")
      .from(HashtagDatabase.TABLE_NAME)
      .where({ name });

    return result[0];
  }

  public async getAllHashtags(): Promise<string[]> {
    const result = await this.getConnection()
      .select("*")
      .from(HashtagDatabase.TABLE_NAME);

    return result;
  }
}
