process.env.NODE_ENV = 'test';

import app from '../src/app';
import { sequelize, models } from '../src/api/models';
import supertest from 'supertest';

const request = supertest.agent(app.listen());

global['request'] = request;

beforeEach('Clean Database', function () {
    return sequelize.sync({ force: true });
});
