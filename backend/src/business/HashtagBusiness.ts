import { HashtagsArrInputDTO, HashtagsArray } from "../model/HashtagsArray";
import { HashtagDatabase } from "../data/HashtagDatabase";
import { IdGenerator } from "../services/IdGenerator";
import { Authenticator } from "../services/Authenticator";
import { InvalidParameterError } from "../error/InvalidParameterError";
import { hash } from "bcryptjs";

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

  async getHashtagId(id: string) {
    if (!id) {
      throw new InvalidParameterError("Missing input");
    }

    const findTagId = await this.hashtagDatabase.getHashtagByName(name);

    return findTagId;
  }

  async getAllHashtags() {
    const getHashtags = await this.hashtagDatabase.getAllHashtags();
    return getHashtags;
  }
}
