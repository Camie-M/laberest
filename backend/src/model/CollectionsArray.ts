export class CollectionsArray {
  constructor(private collections: CollectionInputDTO[]) {}

  getCollections() {
    return this.collections;
  }

  setCollections(collections: CollectionInputDTO[]) {
    this.collections = collections;
  }

  static toCollectionsModel(collection: any): CollectionsArray {
    return new CollectionsArray(collection.collections);
  }
}

export interface CollectionsArrInputDTO {
  collections: string[];
}

export interface CollectionInputDTO {
  title: string;
  subtitle: string;
  date: string;
}
