import { Request } from 'express';

//* Defines user token object
export type DataToken = {
  data: {
    userId: number;
    userName: string;
  };
};

//* Implements a custom request from express Request object
export interface CustomRequest extends Request {
  requestId?: string;
  dataTokenUser?: DataToken | null;
  sourceApp?: string | null;
  versionApp?: string | null;
  accessToken?: string | null;
}

//* Implements interface for server start options
export interface IStartOptions {
  basePath: string;
  port: number;
  host: string;
  requestId: string;
  corsOrigin?: string | string[];
}
