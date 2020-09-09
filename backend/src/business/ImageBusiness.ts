import { ImageInputDTO, Image } from "../model/Image";
import { ImageDatabase } from "../data/ImageDatabase";
import { IdGenerator } from "../services/IdGenerator";
import { Authenticator } from "../services/Authenticator";
import { InvalidParameterError } from "../error/InvalidParameterError";
import moment from "moment";

export class ImageBusiness {
  constructor(
    private imageDatabase: ImageDatabase,
    private idGenerator: IdGenerator,
    private authenticator: Authenticator
  ) {}

  async createImage(image: ImageInputDTO) {
    if (
      !image.subtitle ||
      !image.author ||
      !image.file ||
      !image.tags ||
      !image.collection
    ) {
      throw new InvalidParameterError("Missing input");
    }

    const id = this.idGenerator.generate();

    const dateNow = moment().format("YYYY-MM-DD");

    await this.imageDatabase.createImage(
      new Image(
        id,
        image.subtitle,
        image.author,
        dateNow,
        image.file,
        image.tags,
        image.collection
      )
    );
  }

  async getImageById(id: string) {
    if (!id) {
      throw new InvalidParameterError("Missing input");
    }

    const findImage = await this.imageDatabase.getImageById(id);

    return findImage;
  }

  async getAllImages() {
    const getFeed = await this.imageDatabase.getAllImages();

    console.log(getFeed);

    return getFeed;
  }
}
