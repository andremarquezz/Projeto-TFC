import * as sinon from 'sinon';
import * as chai from 'chai';
const request = require('supertest');
import { app } from '../app';
import { Response } from 'supertest';

const { expect } = chai;

describe('<GET /login/validate>', () => {
  describe('Sem um Token JWT', () => {
    let response: Response;

    beforeEach(async () => {
      response = await request(app).get('/login/validate');
    });

    it('Deve responder com o status 401', () => {
      expect(response.status).to.equal(401);
    });

    it('Deve responder com a mensagem "User not found"', () => {
      expect(response.status).to.equal(401);
    });
    it('Deve responder com a mensagem "Token must be a valid token"', async () => {
      response = await request(app).get('/login/validate').set({ authorization: 'simulaToken' });
      expect(response.status).to.equal(401);
      expect(response.body).to.deep.equal({ message: 'Token must be a valid token' });
    });
  });

  describe('Com um token JWT', () => {
    describe('Deve informar os dados corretos para um usuario', () => {
      let response: Response;

      beforeEach(async () => {
        const {
          body: { token },
        } = await request(app).post('/login').send({
          email: 'user@user.com',
          password: 'secret_user',
        });

        response = await request(app)
          .get('/login/validate')
          .set({ authorization: token });
      });

      it('Deve responder com o status 200', () => {
        expect(response.status).to.equal(200);
      });

      it('Deve informar a "role" corretamente', () => {
        expect(response.body).to.have.property('role', 'user');
        expect(Object.keys(response.body).length).to.equal(1);
      });
    });

    describe('Deve informar os dados corretos para um admin', () => {
      let response: Response;

      beforeEach(async () => {
        const {
          body: { token },
        } = await request(app).post('/login').send({
          email: 'admin@admin.com',
          password: 'secret_admin',
        });

        response = await request(app)
          .get('/login/validate')
          .set({ authorization: token });
      });

      it('Deve responder com o status 200', () => {
        expect(response.status).to.equal(200);
      });

      it('Deve informar a "role" corretamente', () => {
        expect(response.body).to.have.property('role', 'admin');
        expect(Object.keys(response.body).length).to.equal(1);
      });

      it('Deve responder com a mensagem "User not found"', async () => {
        response = await request(app).get('/login/validate').set({
          authorization:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpleUBqZXkuY29tIiwiaWF0IjoxNjY0ODEwMzQ3LCJleHAiOjE2NjU0MTUxNDd9.nfRooW9r9GsRPE_6PgzODZpBL4sQ_4Lg0ClrNk2hwp4',
        });
        expect(response.status).to.equal(401);
        expect(response.body).to.deep.equal({
          message: 'Token must be a valid token',
        });
      });
    });
  });
});
