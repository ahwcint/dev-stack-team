import type { Session, User } from '@prisma/client';
import { BaseResponseApi } from '../../main/dto/base.dto';

export class signInUserRequestApi {
  username: string;
  password: string;
  constructor({ username, password }: { username: string; password: string }) {
    this.username = username;
    this.password = password;
  }
}

export class signInUserResponseApi extends BaseResponseApi<
  Omit<User, 'password'>
> {
  constructor(params: BaseResponseApi<Omit<User, 'password'>>) {
    super(params);
  }
}
