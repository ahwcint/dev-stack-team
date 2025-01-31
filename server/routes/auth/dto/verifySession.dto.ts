import type { Session, User } from '@prisma/client';
import { BaseResponseApi } from '../../main/dto/base.dto';

export class verifySessionRequestApi {
  token: string;
  update?: boolean;
  userId?: string;
  constructor(token: string, update = false, userId?: string) {
    this.token = token;
    this.update = update;
    this.userId = userId;
  }
}
type SessionResponse = Session & { user: Omit<User, 'password'> };
export class verifySessionResponseApi extends BaseResponseApi<SessionResponse> {
  constructor(params: BaseResponseApi<SessionResponse>) {
    super(params);
  }
}
