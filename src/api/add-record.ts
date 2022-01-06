import { API_STORE } from './constants';
import { getResponseData } from './get-data';

export const addRecord = (itemName: string, itemPrice: number, token: string) => {
  API_STORE.defaults.headers.common = { 'Authorization': `Bearer ${token}` }
  return API_STORE.post<IRecord>('sales', {
    itemName, price: itemPrice
  }, {
    headers: {
      usertype: 'STORE_KEEPER'
    }
  })
    .then(res => getResponseData(res))
}
