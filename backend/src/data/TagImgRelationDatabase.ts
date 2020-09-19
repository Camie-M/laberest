import { BaseDatabase } from "./BaseDatabase";

export class TagImageRelationDatabase extends BaseDatabase {
  private static TABLE_NAME = "LABEREST_HASHTAGS_IMAGES";

  public async createTagImageRelation(
    tagId: string,
    imageId: string
  ): Promise<void> {
    try {
      await this.getConnection()
        .insert({
          hashtag_id: tagId,
          image_id: imageId,
        })
        .into(TagImageRelationDatabase.TABLE_NAME);
    } catch (error) {
      console.log(error.message);
    }
  }
}
