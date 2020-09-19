import { BaseDatabase } from "./BaseDatabase";

export class CollectionImageRelationDatabase extends BaseDatabase {
  private static TABLE_NAME = "LABEREST_COLLECTIONS_IMAGES";

  public async createCollectionImageRelation(
    collectionId: string,
    imageId: string
  ): Promise<void> {
    try {
      await this.getConnection()
        .insert({
          collection_id: collectionId,
          image_id: imageId,
        })
        .into(CollectionImageRelationDatabase.TABLE_NAME);
    } catch (error) {
      console.log(error.message);
    }
  }
}
