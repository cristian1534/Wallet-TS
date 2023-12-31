import { UserEntity } from "../domain/user.entity";
import { UserRepository } from "../domain/user.repository";
import { UserValue, AuthValue } from "../domain/user.value";
import { v4 as uuidGenerator } from "uuid";

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

  public async getUsers() {
    const users = await this.userRepository.getUsers();
    return users;
  }

  public async getUser(uuid: string) {
    const user = await this.userRepository.getUser(uuid);
    return user;
  }

  public async updateUser(uuid: string, data: Partial<UserEntity>) {
    const updatedUser = await this.userRepository.updateUser(uuid, data);
    return updatedUser;
  }

  public async deleteUser(uuid: string) {
    const deletedUser = await this.userRepository.deleteUser(uuid);
    return deletedUser;
  }
}
