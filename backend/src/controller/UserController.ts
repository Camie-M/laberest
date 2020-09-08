import { Request, Response } from "express";
import { UserInputDTO, LoginInputDTO } from "../model/User";
import { UserBusiness } from "../business/UserBusiness";
import { UserDatabase } from "../data/UserDatabase";
import { IdGenerator } from "../services/IdGenerator";
import { HashManager } from "../services/HashManager";
import { Authenticator } from "../services/Authenticator";

export class UserController {
  private static UserBusiness = new UserBusiness(
    new UserDatabase(),
    new IdGenerator(),
    new HashManager(),
    new Authenticator()
  );

  public async signup(req: Request, res: Response) {
    try {
      const userInput: UserInputDTO = {
        name: req.body.name,
        email: req.body.email,
        nickname: req.body.nickname,
        password: req.body.password,
      };

      const result = await UserController.UserBusiness.signup(userInput);
      res.status(200).send(result);
    } catch (error) {
      res.status(error.errorCode || 400).send({ message: error.message });
    }
  }

  public async login(req: Request, res: Response) {
    try {
      const loginInput: LoginInputDTO = {
        email: req.body.email,
        password: req.body.password,
      };

      const result = await UserController.UserBusiness.login(loginInput);
      res.status(200).send(result);
    } catch (error) {
      res.status(error.errorCode || 400).send({ message: error.message });
    }
  }
}
