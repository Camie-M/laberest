import {
  CollectionsArray,
  CollectionInputDTO,
} from "../model/CollectionsArray";
import { CollectionsDatabase } from "../data/CollectionDatabase";
import { InvalidParameterError } from "../error/InvalidParameterError";

export class CollectionBusiness {
  constructor(private collectionDatabase: CollectionsDatabase) {}

  async createCollection(collections: CollectionInputDTO[]) {
    if (!collections) {
      throw new InvalidParameterError("Missing input");
    }

    await this.collectionDatabase.createCollection(
      new CollectionsArray(collections)
    );
  }
}
