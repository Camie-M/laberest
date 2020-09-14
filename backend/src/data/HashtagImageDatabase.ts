import { BaseDatabase } from "./BaseDatabase";

export class HashtagImageDatabase extends BaseDatabase {
  private static TABLE_NAME = "LABEREST_HASHTAGS_IMAGES";

  public async createHashtagImageRelation(
    tagId: string,
    imageId: string
  ): Promise<void> {
    try {
      const knex = this.getConnection();
      await knex
        .insert({ hashtag_id: tagId, image_id: imageId })
        .into(HashtagImageDatabase.TABLE_NAME);
    } catch (error) {
      console.log(error.message);
    }
  }
}
