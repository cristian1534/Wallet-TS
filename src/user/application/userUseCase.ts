import { UserRepository } from "../domain/user.repository";
import { UserValue, AuthValue } from "../domain/user.value";
import { v4 as uuidGenerator } from "uuid";

//REGISTER...
export class UserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  public async addUser({
    name,
    email,
    hashedPassword,
  }: {
    name: string;
    email: string;
    hashedPassword: string;
  }) {
    const uuid = uuidGenerator();
    const userValue = new UserValue({ uuid, name, email, hashedPassword });
    const userCreated = await this.userRepository.addUser(userValue);
    return userCreated;
  }

  public async logUser({
    email,
    hashedPassword,
  }: {
    email: string;
    hashedPassword: string;
  }) {
    const authValue = new AuthValue({ email, hashedPassword });
    const loggedUser = await this.userRepository.logUser(authValue);
    return loggedUser;
  }
}


