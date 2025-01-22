import ExpressController from '../utils/functions.controller';
import { MainRoute } from './main';
import { UserRoute } from './user';
import { TypeExpress } from '../server';

export const expressRoutesConfig = <T extends TypeExpress>(_app: T) =>
  ExpressController(_app, [MainRoute, UserRoute]);
