import ExpressController from '../utils/functions.controller';
import { MainRoute } from './main';
import { UserRoute } from './user';
import { AuthRoute } from './auth';
import { TypeExpress } from '../api';

export const expressRoutesConfig = <T extends TypeExpress>(_app: T) =>
  ExpressController(_app, [MainRoute, UserRoute, AuthRoute]);
