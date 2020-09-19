export class Collection {
  constructor(
    private id: string,
    private title: string,
    private subtitle: string,
    private date: string
  ) {}

  getId() {
    return this.id;
  }

  getTitle() {
    return this.title;
  }

  getSubtitle() {
    return this.subtitle;
  }

  getDate() {
    return this.date;
  }

  setId(id: string) {
    this.id = id;
  }

  setTitle(title: string) {
    this.title = title;
  }

  setSubtitle(subtitle: string) {
    this.subtitle = subtitle;
  }

  setDate(date: string) {
    this.date = date;
  }

  static toCollectionModel(collection: any): Collection {
    return new Collection(
      collection.id,
      collection.title,
      collection.subtitle,
      collection.date
    );
  }
}

export interface CollectionInputDTO {
  title: string;
  subtitle: string;
}
