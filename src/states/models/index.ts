import { Models } from '@rematch/core';
import { Blog } from './blogs'
import { Language } from './language'
import { Auth } from './auth';
export interface RootModel extends Models<RootModel> {
  Blog: typeof Blog;
  Language: typeof Language;
  Auth: typeof Auth;
}

export const models: RootModel = {
  Blog,
  Language,
  Auth
};
