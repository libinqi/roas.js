import { expect } from 'chai';
import { UserService } from '../../src/api/services';
import { sequelize, models } from '../../src/api/models';

describe('User Service', () => {
    describe('GET', () => {
        it('should get user success', () => {
            return models.User.create({
                name: 'roas',
                nickname: 'roas.js',
            }).then(async (user) => {
                expect(user.nickname).to.equal('roas.js');

                const userService = new UserService();
                user = await userService.getUser(user.id);
                expect(user.nickname).to.equal('roas.js');
            });
        });
    });
});
