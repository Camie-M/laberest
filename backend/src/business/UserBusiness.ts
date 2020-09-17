import { UserInputDTO, LoginInputDTO, User } from "../model/User";
import { UserDatabase } from "../data/UserDatabase";
import { IdGenerator } from "../services/IdGenerator";
import { HashManager } from "../services/HashManager";
import { Authenticator } from "../services/Authenticator";
import { InvalidParameterError } from "../error/InvalidParameterError";
import { NotFoundError } from "../error/NotFoundError";

export class UserBusiness {
  constructor(
    private userDatabase: UserDatabase,
    private idGenerator: IdGenerator,
    private hashManager: HashManager,
    private authenticator: Authenticator
  ) {}

  async signup(user: UserInputDTO) {
    if (!user.name || !user.email || !user.nickname || !user.password) {
      throw new InvalidParameterError("Missing input");
    }

    if (user.email.indexOf("@") === -1) {
      throw new InvalidParameterError("Invalid email");
    }

    if (user.password.length < 6) {
      throw new InvalidParameterError(
        "Password must be have at least 6 characters"
      );
    }

    const id = this.idGenerator.generate();

    const cryptedPassword = await this.hashManager.hash(user.password);

    await this.userDatabase.createUser(
      new User(id, user.name, user.email, user.nickname, cryptedPassword)
    );

    const accessToken = this.authenticator.generateToken({
      id,
    });

    return accessToken;
  }

  async login(user: LoginInputDTO) {
    if (!user.email || !user.password) {
      throw new InvalidParameterError("Missing input");
    }
    const userFromDB = await this.userDatabase.getUserByEmail(user.email);

    if (!userFromDB) {
      throw new NotFoundError("User not found");
    }

    const isPasswordCorrect = await this.hashManager.compare(
      user.password,
      userFromDB.getPassword()
    );

    if (!isPasswordCorrect) {
      throw new InvalidParameterError("Invalid password");
    }

    return userFromDB;
  }
}
