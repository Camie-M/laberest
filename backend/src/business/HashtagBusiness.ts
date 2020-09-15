import { HashtagsArrInputDTO, HashtagsArray } from "../model/HashtagsArray";
import { HashtagDatabase } from "../data/HashtagDatabase";
import { IdGenerator } from "../services/IdGenerator";
import { InvalidParameterError } from "../error/InvalidParameterError";

export class HashtagBusiness {
  constructor(
    private hashtagDatabase: HashtagDatabase,
    private idGenerator: IdGenerator
  ) {}

  async createHashtag(hashtag: HashtagsArrInputDTO) {
    if (!hashtag.names) {
      throw new InvalidParameterError("Missing input");
    }
    await this.hashtagDatabase.createHashtag(new HashtagsArray(hashtag.names));
  }

  async getHashtagById(id: string) {
    if (!id) {
      throw new InvalidParameterError("Missing input");
    }

    const findTag = await this.hashtagDatabase.getHashtagById(id);

    return findTag;
  }

  async getHashtagByName(name: string) {
    if (!name) {
      throw new InvalidParameterError("Missing input");
    }

    const findTag = await this.hashtagDatabase.getHashtagByName(name);

    return findTag;
  }

  async getAllHashtags() {
    const getHashtags = await this.hashtagDatabase.getAllHashtags();
    return getHashtags;
  }
}
