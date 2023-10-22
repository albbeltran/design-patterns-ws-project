export interface IJsonObject {
  [key: string]: string;
}

//* Defines data for custom errors using an interface
export interface ICustomError extends Error {
  code: string;
  vars?: IJsonObject;
  httpCode: number
}
