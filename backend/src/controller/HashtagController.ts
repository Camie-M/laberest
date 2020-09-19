import { Request, Response } from "express";
import { IdGenerator } from "../services/IdGenerator";
import { Authenticator } from "../services/Authenticator";
import { HashtagInputDTO } from "../model/Hashtag";
import { HashtagBusiness } from "../business/HashtagBusiness";
import { HashtagDatabase } from "../data/HashtagDatabase";
import { TagImageRelationDatabase } from "../data/TagImgRelationDatabase";

export class HashtagController {
  private static HashtagBusiness = new HashtagBusiness(
    new HashtagDatabase(),
    new IdGenerator(),
    new TagImageRelationDatabase()
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
      const userInput: HashtagInputDTO = req.body.name;

      const imageId: string = req.body.params;

      /* Conferir se tag já existe */
      const hashtagDB = await HashtagController.HashtagBusiness.getHashtagByName(
        userInput.name
      );

      if (!hashtagDB) {
        await HashtagController.HashtagBusiness.createHashtag(
          userInput,
          imageId
        );
      } else {
        const tagImageRelation = new TagImageRelationDatabase();
        tagImageRelation.createTagImageRelation(hashtagDB.getId(), imageId);
      }

      res.status(200).send({ message: "Hashtag created successfully" });
    } catch (error) {
      res.status(error.errorCode || 400).send({ message: error.message });
      console.log(error);
    }
  }
}
