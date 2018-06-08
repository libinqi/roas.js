process.env.NODE_ENV = 'test';

import { sequelize, models } from '../src/api/models';

beforeEach('Clean Database', function () {
    return sequelize.sync({ force: true });
});
