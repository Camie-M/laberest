import { HashtagInputDTO, Hashtag } from "../model/Hashtag";
import { HashtagDatabase } from "../data/HashtagDatabase";
import { TagImageRelationDatabase } from "../data/TagImgRelationDatabase";
import { IdGenerator } from "../services/IdGenerator";
import { InvalidParameterError } from "../error/InvalidParameterError";

export class HashtagBusiness {
  constructor(
    private hashtagDatabase: HashtagDatabase,
    private idGenerator: IdGenerator,
    private tagImageRelationDatabase: TagImageRelationDatabase
  ) {}

  async createHashtag(hashtag: HashtagInputDTO, imageId: string) {
    if (!hashtag.name) {
      throw new InvalidParameterError("Missing input");
    }

    const hashtagId = this.idGenerator.generate();

    await this.hashtagDatabase.createHashtag(
      new Hashtag(hashtag.name, hashtagId)
    );

    await this.tagImageRelationDatabase.createTagImageRelation(
      hashtagId,
      imageId
    );
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
