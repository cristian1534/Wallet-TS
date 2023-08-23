import { UserEntity } from "./user.entity";

export interface UserRepository {
  addUser(user: UserEntity): Promise<UserEntity | null>;
}
