import { expect } from 'chai';
import { sequelize, models } from '../../src/api/models';

describe('User Model', () => {
    describe('Create', () => {
        it('should create user success', () => {
            return models.User.create({
                name: 'roas',
                nickname: 'roas.js',
            }).then((user) => {
                expect(user.nickname).to.equal('roas.js');
            });
        });
    });
});
