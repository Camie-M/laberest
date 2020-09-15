import { BaseDatabase } from "./BaseDatabase";
import {
  CollectionsArray,
  CollectionInputDTO,
} from "../model/CollectionsArray";
import { IdGenerator } from "../services/IdGenerator";

export class CollectionsDatabase extends BaseDatabase {
  private static TABLE_NAME = "LABEREST_COLLECTIONS";

  private toModel(dbModel?: any): CollectionsArray | undefined {
    return dbModel && new CollectionsArray(dbModel.collections);
  }

  public async createCollection(collections: CollectionsArray): Promise<void> {
    try {
      const knex = this.getConnection();

      const generateId = new IdGenerator();

      const collectionsArray: CollectionInputDTO[] = collections.getCollections();

      for (let item of collectionsArray) {
        const id = generateId.generate();

        await knex
          .insert({
            id: id,
            title: item.title,
            subtitle: item.subtitle,
            datetime: item.date,
          })
          .into(CollectionsDatabase.TABLE_NAME);
      }
    } catch (error) {
      console.log(error.message);
    }
  }
}
