import * as chai from 'chai'
import * as sinon from 'sinon'
import { app } from '../app'
// @ts-ignore
import chaiHttp = require('chai-http');
import SequelizeUser from '../database/models/SequelizeUser'
import { completeData, goodData, noEmailData, noPasswordData } from './mocks/login.mock'

chai.use(chaiHttp);

const { expect } = chai;

describe('Rota /login', () => {
  it('verifica se não é possível fazer login sem o email', async () => {
    const { status, body } = await chai.request(app).post('/login').send(noEmailData);

    expect(status).to.equal(400);
    expect(body).to.deep.equal({ "message": "All fields must be filled" });
  });

  it('verifica se não é possível fazer login sem a senha', async () => {
    const { status, body } = await chai.request(app).post('/login').send(noPasswordData); 

    expect(status).to.equal(400);
    expect(body).to.deep.equal({ "message": "All fields must be filled" });
  });

  it('se tudo está certo, verifica se é possível fazer login', async () => {
    const goodResponse = SequelizeUser.build(completeData);
    sinon.stub(SequelizeUser, 'findAll').resolves([goodResponse])

    const { status, body } = await chai.request(app).post('/login').send(goodData);

    expect(status).to.equal(200);
    expect(body).to.have.key('token');
  });
});