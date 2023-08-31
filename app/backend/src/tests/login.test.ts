import * as chai from 'chai'
import * as sinon from 'sinon'
import { app } from '../app'
// @ts-ignore
import chaiHttp = require('chai-http');

import SequelizeUser from '../database/models/SequelizeUser'
import { 
  completeData,
  data,
  noEmailData,
  noPasswordData, 
  payloadData,
} from './mocks/login.mock'

import bcryptUtil from '../utils/bcryptUtil';
import jwtUtil from '../utils/jwtUtil';

chai.use(chaiHttp);

const { expect } = chai;

describe('Rota POST /login', () => {
  it('verifica se não é possível fazer login sem o email', async () => {
    const { status, body } = await chai.request(app).post('/login').send(noEmailData);

    expect(status).to.equal(400);
    expect(body).to.deep.equal({ message: 'All fields must be filled' });
  });

  it('verifica se não é possível fazer login sem a senha', async () => {
    const { status, body } = await chai.request(app).post('/login').send(noPasswordData); 

    expect(status).to.equal(400);
    expect(body).to.deep.equal({ message: 'All fields must be filled' });
  });

  // falta testes de formatação do email e password

  it('verifica se não é possível fazer login com email fora do banco', async () => {
    sinon.stub(SequelizeUser, 'findAll').resolves([]);

    const { status, body } = await chai.request(app).post('/login').send(data);

    expect(status).to.equal(401);
    expect(body).to.deep.equal({ message: 'Invalid email or password' });
  });

  it('verifica se não é possível fazer login com senha errada',async () => {
    const goodResponse = SequelizeUser.build(completeData);
    sinon.stub(SequelizeUser, 'findAll').resolves([goodResponse])
    sinon.stub(bcryptUtil, 'verify').resolves(false);

    const { status, body } = await chai.request(app).post('/login').send(data);

    expect(status).to.equal(401);
    expect(body).to.deep.equal({ message: 'Invalid email or password' });
  });

  it('se tudo está certo, verifica se é possível fazer login', async () => {
    const goodResponse = SequelizeUser.build(completeData);
    sinon.stub(SequelizeUser, 'findAll').resolves([goodResponse])
    sinon.stub(bcryptUtil, 'verify').resolves(true);

    const { status, body } = await chai.request(app).post('/login').send(data);

    expect(status).to.equal(200);
    expect(body).to.have.key('token');
  });

  afterEach(sinon.restore);
});

describe('Rota GET /login/role', () => {
  it('verifica se não é possível retornar o objeto sem o token', async () => {
    const { status, body } = await chai.request(app)
      .get('/login/role')
      .set({ 'authorization': undefined });

    expect(status).to.equal(401);
    expect(body).to.deep.equal({ message: "Token not found" });
  });

  it('verifica se não é possível retornar o objeto com o token errado', async () => {
    const { status, body } = await chai.request(app)
      .get('/login/role')
      .set({ 'authorization': 'xablau' });

    expect(status).to.equal(401);
    expect(body).to.deep.equal({ message: "Token must be a valid token" });
  });

  it('verifica se o objeto é retornado com o token correto',async () => {
    sinon.stub(jwtUtil, 'verify').returns(payloadData);

    const { status, body } = await chai.request(app)
      .get('/login/role')
      .set({ 'authorization': 'goodToken' });

    expect(status).to.equal(200);
    expect(body).to.deep.equal({ role: payloadData.role })
  });

  afterEach(sinon.restore);
});