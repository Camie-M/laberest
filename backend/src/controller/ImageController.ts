import { Request, Response } from "express";
import { ImageInputDTO } from "../model/Image";
import { ImageDatabase } from "../data/ImageDatabase";
import { ImageBusiness } from "../business/ImageBusiness";
import { IdGenerator } from "../services/IdGenerator";
import { Authenticator } from "../services/Authenticator";
import { NotFoundError } from "../error/NotFoundError";
import { HashtagsArrInputDTO } from "../model/HashtagsArray";
import { HashtagBusiness } from "../business/HashtagBusiness";
import { HashtagDatabase } from "../data/HashtagDatabase";

export class ImageController {
  private static ImageBusiness = new ImageBusiness(
    new ImageDatabase(),
    new IdGenerator()
  );

  private static HashtagBusiness = new HashtagBusiness(
    new HashtagDatabase(),
    new IdGenerator()
  );

  public async createImage(req: Request, res: Response) {
    try {
      /* Autenticação do token */
      const token = req.headers.authorization as string;

      const authenticator = new Authenticator();
      const authenticationData = authenticator.getData(token);

      if (!authenticationData) {
        throw new Error("Token unanthorized");
      }

      /* Pegar dados enviados pelo usuário */
      const tagsArray = req.body.tags;

      const tagInput: HashtagsArrInputDTO = {
        names: tagsArray,
      };

      const imageInput: ImageInputDTO = {
        subtitle: req.body.subtitle,
        author: req.body.author,
        file: req.body.file,
        collection: req.body.collection,
      };

      /* Conferir se tag já existe */
      for (let item of tagsArray) {
        const hashtagDB = await ImageController.HashtagBusiness.getHashtagByName(
          item
        );

        if (!hashtagDB) {
          await ImageController.HashtagBusiness.createHashtag(tagInput);
        }
      }

      await ImageController.ImageBusiness.createImage(imageInput);
      res.status(200).send("Image created successfully");
    } catch (error) {
      res.status(error.errorCode || 400).send({ message: error.message });
    }
  }

  public async getImageById(req: Request, res: Response) {
    try {
      const token = req.headers.authorization as string;

      const authenticator = new Authenticator();
      const authenticationData = authenticator.getData(token);

      if (!authenticationData) {
        throw new Error("Token unanthorized");
      }
      const userInput: string = req.params.id;

      const result = await ImageController.ImageBusiness.getImageById(
        userInput
      );

      if (!result) {
        throw new NotFoundError("Image not found");
      }
      res.status(200).send(result);
    } catch (error) {
      res.status(error.errorCode || 400).send({ message: error.message });
    }
  }

  public async getAllImages(req: Request, res: Response) {
    try {
      const token = req.headers.authorization as string;

      const authenticator = new Authenticator();
      const authenticationData = authenticator.getData(token);

      if (!authenticationData) {
        throw new Error("Token unanthorized");
      }

      const result = await ImageController.ImageBusiness.getAllImages();

      if (!result) {
        throw new NotFoundError("Feed not found");
      }
      res.status(200).send(result);
    } catch (error) {
      res.status(error.errorCode || 400).send({ message: error.message });
    }
  }
}
