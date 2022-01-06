import { API_STORE } from './constants';
import { getResponseData } from './get-data';

export const getRecords = (token: string) => {
  API_STORE.defaults.headers.common = { 'Authorization': `Bearer ${token}` }
  return API_STORE.get<Array<IRecord>>('sales/approved', {
    headers: {
      usertype: 'INVESTOR'
    }
  })
    .then(res => getResponseData(res))
}
