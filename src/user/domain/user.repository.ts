import { UserEntity, AuthEntity } from "./user.entity";

export interface UserRepository {
  addUser(user: UserEntity): Promise<UserEntity | null>;
  logUser(credentials: AuthEntity): Promise<UserEntity | null>;
}
