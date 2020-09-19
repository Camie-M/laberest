import { Collection, CollectionInputDTO } from "../model/Collection";
import { CollectionDatabase } from "../data/CollectionDatabase";
import { InvalidParameterError } from "../error/InvalidParameterError";
import { IdGenerator } from "../services/IdGenerator";
import { CollectionImageRelationDatabase } from "../data/CollectionImgRelationDatabase";
import moment from "moment";

export class CollectionBusiness {
  constructor(
    private collectionDatabase: CollectionDatabase,
    private idGenerator: IdGenerator,
    private collectionImageRelationDatabase: CollectionImageRelationDatabase
  ) {}

  async createCollection(collection: CollectionInputDTO, imageId: string) {
    if (!collection) {
      throw new InvalidParameterError("Missing input");
    }

    const collectionId = this.idGenerator.generate();

    const dateNow = moment().format("YYYY-MM-DD HH:mm");

    await this.collectionDatabase.createCollection(
      new Collection(
        collectionId,
        collection.title,
        collection.subtitle,
        dateNow
      )
    );

    await this.collectionImageRelationDatabase.createCollectionImageRelation(
      collectionId,
      imageId
    );
  }

  async getCollectionByTitle(title: string) {
    if (!title) {
      throw new InvalidParameterError("Missing input");
    }

    const findCollection = await this.collectionDatabase.getCollectionByTitle(
      title
    );

    return findCollection;
  }

  async getAllCollections() {
    const getCollections = await this.collectionDatabase.getAllCollections();
    return getCollections;
  }
}
