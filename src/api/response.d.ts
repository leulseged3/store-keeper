declare interface ILoginResponse {
  firstName: string;
  lastName: string;
  email: string;
  access_token: string;
}
declare interface IRecord {
  _id: string,
  itemName: string,
  price: number,
  isApproved: boolean,
}