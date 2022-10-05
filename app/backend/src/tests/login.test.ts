import * as sinon from 'sinon';
import * as chai from 'chai';
import { app } from '../app';
import { Response } from 'supertest';
const request = require('supertest');

const { expect } = chai;

describe(' < POST /login >', () => {

  describe('Quando o formato dos dados estiverem incorretos', () => {
    it('Quando estiver faltando o e-mail deve responder com o status 400', async () => {
      const response = await request(app).post('/login').send({
        password: 'secret_user',
      });
      expect(response.status).to.equal(400);
    });
  });

  describe('Quando o formato dos dados estiverem corretos', () => {
      let response: Response;
      before(async () => {
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
