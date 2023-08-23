import { UserRepository } from "../domain/user.repository";
import { UserValue } from "../domain/user.value";

export class UserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  public async addUser({
    name,
    email,
    password,
  }: {
    name: string;
    email: string;
    password: string;
  }) {
    const userValue = new UserValue({ name, email, password });
    const userCreated = await this.userRepository.addUser(userValue);
    return userCreated;
  }
}
