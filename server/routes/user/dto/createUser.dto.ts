import type { Session, User } from '@prisma/client';
import { BaseResponseApi } from '../../main/dto/base.dto';

export class createUserRequestApi {
  username: string;
  password: string;
  constructor({ username, password }: { username: string; password: string }) {
    this.username = username;
    this.password = password;
  }
}

export class createUserResponseApi extends BaseResponseApi<
  Omit<User, 'password'> & { session: Session }
> {
  constructor(
    params: BaseResponseApi<Omit<User, 'password'> & { session: Session }>,
  ) {
    super(params);
  }
}
