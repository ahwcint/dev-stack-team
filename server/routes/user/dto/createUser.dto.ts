import type { User } from '@prisma/client';
import { BaseResponseApi } from '../../main/dto/base.dto';

export class createUserRequestApi {
  username: string;
  password: string;
  constructor({ username, password }: { username: string; password: string }) {
    this.username = username;
    this.password = password;
  }
}

export class createUserResponseApi extends BaseResponseApi<User> {
  constructor(params: BaseResponseApi<User>) {
    super(params);
  }
}
