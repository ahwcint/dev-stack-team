import ExpressController from '../utils/functions.controller';
import { Main } from './main';
import { User } from './user';
import { TypeExpress } from '../server';

export const expressRoutesConfig = <T extends TypeExpress>(_app: T) =>
  ExpressController(_app, [Main, User]);
