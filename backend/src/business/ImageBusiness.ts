import { ImageInputDTO, Image } from "../model/Image";
import { ImageDatabase } from "../data/ImageDatabase";
import { IdGenerator } from "../services/IdGenerator";
import { InvalidParameterError } from "../error/InvalidParameterError";
import moment from "moment";

export class ImageBusiness {
  constructor(
    private imageDatabase: ImageDatabase,
    private idGenerator: IdGenerator
  ) {}

  async createImage(image: ImageInputDTO) {
    if (!image.subtitle || !image.author || !image.file || !image.collection) {
      throw new InvalidParameterError("Missing input");
    }

    const imageId = this.idGenerator.generate();

    const dateNow = moment().format("YYYY-MM-DD HH:mm");

    await this.imageDatabase.createImage(
      new Image(
        imageId,
        image.subtitle,
        image.author,
        dateNow,
        image.file,
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
    return getFeed;
  }
}
