import * as moment from "moment";

export class Image {
  constructor(
    private id: string,
    private subtitle: string,
    private author: string,
    private date: string,
    private file: string,
    private collection: string
  ) {}

  getId() {
    return this.id;
  }

  getSubtitle() {
    return this.subtitle;
  }

  getAuthor() {
    return this.author;
  }

  getDate() {
    return this.date;
  }

  getFile() {
    return this.file;
  }

  getCollection() {
    return this.collection;
  }

  setId(id: string) {
    this.id = id;
  }

  setSubtitle(subtitle: string) {
    this.subtitle = subtitle;
  }

  setAuthor(author: string) {
    this.author = author;
  }

  setDate(date: string) {
    this.date = date;
  }

  setFile(file: string) {
    this.file = file;
  }

  setCollection(collection: string) {
    this.collection = collection;
  }

  static toImageModel(image: any): Image {
    return new Image(
      image.id,
      image.subtitle,
      image.author,
      image.date,
      image.file,
      image.collection
    );
  }
}

export interface ImageInputDTO {
  subtitle: string;
  author: string;
  file: string;
  collection: string;
}
