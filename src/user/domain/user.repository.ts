import { UserEntity, AuthEntity } from "./user.entity";

export interface UserRepository {
  addUser(user: UserEntity): Promise<UserEntity | null>;
  logUser(credentials: AuthEntity): Promise<UserEntity | null>;
  getUsers(): Promise<UserEntity[] | null>;
  getUser(uuid: string): Promise<UserEntity | null>;
  updateUser(uuid: string, data: Partial<UserEntity | null>): Promise<UserEntity | null>;
}
