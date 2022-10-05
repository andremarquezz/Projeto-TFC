import * as sinon from 'sinon';
import * as chai from 'chai';
import { app } from '../app';
import { Response } from 'supertest';
const request = require('supertest');

import 'express-async-errors';

const { expect } = chai;

describe(' < POST /login >', () => {
  describe('Quando o formato dos dados estiverem incorretos', () => {
    it('Quando estiver faltando o e-mail deve responder com o status 400', async () => {
      const response = await request(app).post('/login').send({
        password: 'secret_user',
      });
      expect(response.status).to.equal(400);
      expect(response.body).to.deep.equal({ message: 'All fields must be filled' });
    });
    it('Quando o usuario não existir deve responder com "Incorrect email or password"', async () => {
      const response = await request(app).post('/login').send({
        email: 'test@example.com',
        password: 'secret_user',
      });
      expect(response.status).to.equal(401);
      expect(response.body).to.deep.equal({
        message: 'Incorrect email or password',
      });
    });
  });

  describe('Quando o formato dos dados estiverem corretos', () => {
    let response: Response;
    beforeEach(async () => {
      response = await request(app).post('/login').send({
        email: 'user@user.com',
        password: 'secret_user',
      });
    });
    it('Deve ter o status 200', () => {
      expect(response.status).to.equal(200);
    });

    it('Deve conter um token', () => {
      expect(response.body.token).not.be.undefined;
    });
  });
});
