process.env.NODE_ENV = 'test';

beforeEach('Clean Database', function () {
    const sequelize = db.sequelize;
    return sequelize.sync({force: true});
});
