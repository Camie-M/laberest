import { BaseDatabase } from "./BaseDatabase";
import { Hashtag } from "../model/Hashtag";

export class HashtagDatabase extends BaseDatabase {
  private static TABLE_NAME = "LABEREST_HASHTAGS";

  public async createHashtag(tag: Hashtag): Promise<void> {
    try {
      await this.getConnection()
        .insert({
          id: tag.getId(),
          name: tag.getName(),
        })
        .into(HashtagDatabase.TABLE_NAME);
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

  public async getHashtagByName(name: string): Promise<Hashtag> {
    const result = await this.getConnection()
      .select("*")
      .from(HashtagDatabase.TABLE_NAME)
      .where({ name });

    return result[0];
  }

  public async getAllHashtags(): Promise<Hashtag[]> {
    const result = await this.getConnection()
      .select("*")
      .from(HashtagDatabase.TABLE_NAME);

    return result;
  }
}
