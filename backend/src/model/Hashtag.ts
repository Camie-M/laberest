export class Hashtag {
  constructor(private id: string, private name: string) {}

  getId() {
    return this.id;
  }

  getName() {
    return this.name;
  }

  setId(id: string) {
    this.id = id;
  }

  setName(name: string) {
    this.name = name;
  }

  static toHashtagModel(image: any): Hashtag {
    return new Hashtag(image.id, image.name);
  }
}

export interface HashtagInputDTO {
  name: string;
}
