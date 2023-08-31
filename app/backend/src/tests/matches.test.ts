import * as chai from 'chai';
import * as sinon from 'sinon';

//@ts-ignore
import chaiHttp = require('chai-http');

import SequelizeMatch from '../database/models/SequelizeMatch';
import app from '../app';
import { match, matchInProgress, matches, matchesInProgress, payloadData } from './mocks/matches.mock';
import jwtUtil from '../utils/jwtUtil';

chai.use(chaiHttp);
const { expect } = chai;

describe('Rota /matches', () => {
  it('GET /matches deve retornar todos os dados de forma correta', async () => {
    const goodResponse = SequelizeMatch.build(match);
    sinon.stub(SequelizeMatch, 'findAll').resolves([goodResponse]);

    const { status, body } = await chai.request(app).get('/matches');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(matches);
  });

  it('GET /matches?inProgress=true retorna os dados dos jogos em progresso', async () => {
    const goodResponse = SequelizeMatch.build(matchInProgress);
    sinon.stub(SequelizeMatch, 'findAll').resolves([goodResponse]);

    const { status, body } = await chai.request(app).get('/matches?inProgress=true');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(matchesInProgress);
  });

  it('GET /matches?inProgress=false retorna os dados dos jogos parados', async () => {
    const goodResponse = SequelizeMatch.build(match);
    sinon.stub(SequelizeMatch, 'findAll').resolves([goodResponse]);

    const { status, body } = await chai.request(app).get('/matches?inProgress=false');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(matches);
  });

  afterEach(sinon.restore);
});

describe('Rota /matches/:id/finish', () => {
  it('a rota não pode ser acessada sem o token', async () => {
    const { status, body } = await chai.request(app).patch('/matches/1/finish');

    expect(status).to.equal(401);
    expect(body).to.deep.equal({ message: 'Token not found' });
  });

  it('a rota não pode ser acessada com o token inválido', async () => {
    sinon.stub(jwtUtil, 'verify').returns('Token must be a valid token');

    const { status, body } = await chai.request(app)
      .patch('/matches/1/finish')
      .set({ authorization: 'badToken'});

    expect(status).to.equal(401);
    expect(body).to.deep.equal({ message: 'Token must be a valid token' });
  });

  it('PATCH /matches/:id/finish finaliza uma partida em progresso', async () => {
    const goodResponse = SequelizeMatch.build(matchInProgress);
    const matchNotInProgress = { ...matchInProgress, inProgress: false };
    const newGoodResponse = SequelizeMatch.build(matchNotInProgress);

    sinon.stub(SequelizeMatch, 'findByPk').onFirstCall().resolves(goodResponse)
      .onSecondCall().resolves(newGoodResponse);
    sinon.stub(jwtUtil, 'verify').returns(payloadData);

    const { status, body } = await chai.request(app).patch('/matches/1/finish');

    expect(status).to.equal(200);
    expect(body).to.deep.equal({ message: 'Finished'});
  });

  afterEach(sinon.restore);
});

describe('Rota matches/:id', () => {
  it('a rota não pode ser acessada sem o token', async () => {
    const { status, body } = await chai.request(app).patch('/matches/1');

    expect(status).to.equal(401);
    expect(body).to.deep.equal({ message: 'Token not found' });
  });

  it('a rota não pode ser acessada com o token inválido', async () => {
    sinon.stub(jwtUtil, 'verify').returns('Token must be a valid token');

    const { status, body } = await chai.request(app)
      .patch('/matches/1')
      .set({ authorization: 'badToken'});

    expect(status).to.equal(401);
    expect(body).to.deep.equal({ message: 'Token must be a valid token' });
  });

  it('PATCH /matches/:id altera o resultado de uma partida',async () => {
    const goodResponse = SequelizeMatch.build(matchInProgress);
    sinon.stub(SequelizeMatch, 'findByPk').resolves(goodResponse);

    const { status, body } = await chai.request(app).patch('/matches/1');

    expect(status).to.equal(200);
  });
  afterEach(sinon.restore);
});