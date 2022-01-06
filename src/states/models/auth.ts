import { createModel } from '@rematch/core';
import type { RootModel } from './index';

interface IAuth {
  firstName: string;
  lastName: string;
  email: string;
  token: string;
}

export const Auth = createModel<RootModel>()({
  state: {
    firstName: '',
    lastName: '',
    email: '',
    token: ''
  } as IAuth,
  reducers: {
    setAuth(state, payload: IAuth) {
      return {
        ...state,
        firstName: payload.firstName,
        lastName: payload.lastName,
        email: payload.email,
        token: payload.token
      }
    },
  },
});
