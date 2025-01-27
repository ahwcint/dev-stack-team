import type { Session, User } from '@prisma/client';
import { BaseResponseApi } from '../../main/dto/base.dto';

export class verifySessionRequestApi {
  token: string;
  constructor(token: string) {
    this.token = token;
  }
}
type SessionResponse = Session & { user: Omit<User, 'password'> };
export class verifySessionResponseApi extends BaseResponseApi<SessionResponse> {
  constructor(params: BaseResponseApi<SessionResponse>) {
    super(params);
  }
}
