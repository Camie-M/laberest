export class HashtagsArray {
  constructor(private names: string[]) {}

  getNames() {
    return this.names;
  }

  setName(names: string[]) {
    this.names = names;
  }

  static toHashtagModel(tag: any): HashtagsArray {
    return new HashtagsArray(tag.names);
  }
}

export interface HashtagsArrInputDTO {
  names: string[];
}
