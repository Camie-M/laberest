import { Request, Response } from "express";
import { IdGenerator } from "../services/IdGenerator";
import { Authenticator } from "../services/Authenticator";
import { CollectionInputDTO } from "../model/Collection";
import { CollectionBusiness } from "../business/CollectionBusiness";
import { CollectionDatabase } from "../data/CollectionDatabase";
import { CollectionImageRelationDatabase } from "../data/CollectionImgRelationDatabase";

export class CollectionController {
  private static CollectionBusiness = new CollectionBusiness(
    new CollectionDatabase(),
    new IdGenerator(),
    new CollectionImageRelationDatabase()
  );

  public async createHashtag(req: Request, res: Response) {
    try {
      /* Autenticação do token */
      const token = req.headers.authorization as string;

      const authenticator = new Authenticator();
      const authenticationData = authenticator.getData(token);

      if (!authenticationData) {
        throw new Error("Token unanthorized");
      }

      /* Pegar dados enviados pelo usuário */
      const userInput: CollectionInputDTO = {
        subtitle: req.body.subtitle,
        title: req.body.title,
      };

      const imageId: string = req.body.params;

      /* Conferir se tag já existe */
      const hashtagDB = await CollectionController.CollectionBusiness.getCollectionByTitle(
        userInput.title
      );

      if (!hashtagDB) {
        await CollectionController.CollectionBusiness.createCollection(
          userInput,
          imageId
        );
      } else {
        const collectionImageRelation = new CollectionImageRelationDatabase();
        collectionImageRelation.createCollectionImageRelation(
          hashtagDB.getId(),
          imageId
        );
      }

      res.status(200).send({ message: "Collection created successfully" });
    } catch (error) {
      res.status(error.errorCode || 400).send({ message: error.message });
      console.log(error);
    }
  }
}
