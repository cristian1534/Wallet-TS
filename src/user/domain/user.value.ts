import { UserEntity, AuthEntity } from "./user.entity";

// REGISTER...
export class UserValue implements UserEntity {
  uuid: string;
  name: string;
  email: string;
  hashedPassword: string;

  constructor({
    uuid,
    name,
    email,
    hashedPassword,
  }: {
    uuid: string;
    name: string;
    email: string;
    hashedPassword: string;
  }) {
    this.uuid = uuid;
    this.name = name;
    this.email = email;
    this.hashedPassword = hashedPassword;
  }
}


// LOGIN...
export class AuthValue implements AuthEntity {
  email: string;
  hashedPassword: string;

  constructor({
    email,
    hashedPassword,
  }: {
    email: string;
    hashedPassword: string;
  }) {
    (this.email = email), (this.hashedPassword = hashedPassword);
  }
}
