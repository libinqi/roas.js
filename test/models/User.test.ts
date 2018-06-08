import {expect} from 'chai';

describe('User Model', () => {
    describe('Create', () => {
        it('should create user success', () => {
            return User.create({
                name: 'roas',
                nickname: 'roas.js',
            }).then((user) => {
                expect(user.nickname).to.equal('roas.js');
            });
        });
    });
});
