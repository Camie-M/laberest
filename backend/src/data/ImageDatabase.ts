import { BaseDatabase } from "./BaseDatabase";
import { Image, ImageInputDTO } from "../model/Image";

export class ImageDatabase extends BaseDatabase {
  private static TABLE_NAME = "LABEREST_IMAGES";

  private toModel(dbModel?: any): Image | undefined {
    return (
      dbModel &&
      new Image(
        dbModel.id,
        dbModel.subtitle,
        dbModel.author,
        dbModel.date,
        dbModel.file
      )
    );
  }

  public async createImage(image: Image): Promise<void> {
    await this.getConnection()
      .insert({
        id: image.getId(),
        subtitle: image.getSubtitle(),
        author: image.getAuthor(),
        date: image.getDate(),
        file: image.getFile(),
      })
      .into(ImageDatabase.TABLE_NAME);
  }

  public async getImageById(id: string): Promise<Image> {
    const result = await this.getConnection()
      .select("*")
      .from(ImageDatabase.TABLE_NAME)
      .where({ id });

    return Image.toImageModel(result[0]);
  }

  public async getAllImages(): Promise<Image[]> {
    const result = await this.getConnection()
      .select("*")
      .from(ImageDatabase.TABLE_NAME);
    return result;
  }

  public async getAllImagesByDate(): Promise<Image[]> {
    const result = await this.getConnection().raw(`
    SELECT * FROM LABEREST_IMAGES
    ORDER BY date DESC 
    `);
    return result;
  }

  public async getAllImagesByAuthor(author: string): Promise<Image[]> {
    const result = await this.getConnection().raw(`
    SELECT * FROM LABEREST_IMAGES
    WHERE author = "${author}"
    ORDER BY date DESC 
    `);
    return result;
  }
}
