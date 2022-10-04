import { Response } from 'express';

export default interface IResponseToken extends Response {
  locals: {
    user: {
      email: string;
      role: string;
    };
  };
}
