import { ImageInputDTO, Image } from "../model/Image";
import { ImageDatabase } from "../data/ImageDatabase";
import { IdGenerator } from "../services/IdGenerator";
import { Authenticator } from "../services/Authenticator";
import { InvalidParameterError } from "../error/InvalidParameterError";
import moment from "moment";

export class ImageBusiness {
  constructor(
    private imageDatabase: ImageDatabase,
    private idGenerator: IdGenerator
  ) {}

  async createImage(image: ImageInputDTO) {
    if (!image.subtitle || !image.author || !image.file) {
      throw new InvalidParameterError("Missing input");
    }

    const imageId = this.idGenerator.generate();

    const dateNow = moment().format("YYYY-MM-DD HH:mm");

    await this.imageDatabase.createImage(
      new Image(imageId, image.subtitle, image.author, dateNow, image.file)
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

  async getAllImagesByDate() {
    const getFeedByDate = await this.imageDatabase.getAllImagesByDate();
    return getFeedByDate;
  }

  async getAllImagesByAuthor(author: string) {
    const getFeedByAuthor = await this.imageDatabase.getAllImagesByAuthor(
      author
    );
    return getFeedByAuthor;
  }
}
