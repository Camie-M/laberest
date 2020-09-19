import { BaseDatabase } from "./BaseDatabase";
import { Collection } from "../model/Collection";

export class CollectionDatabase extends BaseDatabase {
  private static TABLE_NAME = "LABEREST_COLLECTIONS";

  private toModel(dbModel?: any): Collection | undefined {
    return (
      dbModel &&
      new Collection(dbModel.id, dbModel.title, dbModel.subtitle, dbModel.date)
    );
  }

  public async createCollection(collection: Collection): Promise<void> {
    try {
      await this.getConnection()
        .insert({
          id: collection.getId(),
          title: collection.getTitle(),
          subtitle: collection.getSubtitle(),
          date: collection.getDate(),
        })
        .into(CollectionDatabase.TABLE_NAME);
    } catch (error) {
      console.log(error.message);
    }
  }

  public async getCollectionByTitle(title: string): Promise<Collection> {
    const result = await this.getConnection()
      .select("*")
      .from(CollectionDatabase.TABLE_NAME)
      .where({ title });

    return result[0];
  }

  public async getAllCollections(): Promise<Collection[]> {
    const result = await this.getConnection()
      .select("*")
      .from(CollectionDatabase.TABLE_NAME);

    return result;
  }
}
