import * as chai from 'chai';
import * as sinon from 'sinon';

//@ts-ignore
import chaiHttp = require('chai-http');

import SequelizeMatch from '../database/models/SequelizeMatch';
import app from '../app';
import { match, matchInProgress, matches, matchesInProgress } from './mocks/matches.mock';

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