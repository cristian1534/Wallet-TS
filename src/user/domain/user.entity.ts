export interface AuthEntity {
  email: string;
  hashedPassword: string;
}

export interface UserEntity extends AuthEntity {
  uuid: string;
  name: string;
}
