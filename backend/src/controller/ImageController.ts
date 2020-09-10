import { Request, Response } from "express";
import { ImageInputDTO } from "../model/Image";
import { ImageDatabase } from "../data/ImageDatabase";
import { ImageBusiness } from "../business/ImageBusiness";
import { IdGenerator } from "../services/IdGenerator";
import { Authenticator } from "../services/Authenticator";
import { NotFoundError } from "../error/NotFoundError";

export class ImageController {
  private static ImageBusiness = new ImageBusiness(
    new ImageDatabase(),
    new IdGenerator(),
    new Authenticator()
  );

  public async createImage(req: Request, res: Response) {
    try {
      const token = req.headers.authorization as string;

      const authenticator = new Authenticator();
      const authenticationData = authenticator.getData(token);

      if (!authenticationData) {
        throw new Error("Token unanthorized");
      }

      const userInput: ImageInputDTO = {
        subtitle: req.body.subtitle,
        author: req.body.author,
        file: req.body.file,
        tags: req.body.tags,
        collection: req.body.collection,
      };

      await ImageController.ImageBusiness.createImage(userInput);
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
