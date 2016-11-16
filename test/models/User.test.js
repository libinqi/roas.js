import {expect} from 'chai';

describe('User Model', () => {
    describe('Create', () => {
        it('should create user success', () => {
            return User.create({
                name: 'amber',
                nickname: 'Amber',
            }).then((user) => {
                expect(user.nickname).to.equal('Amber');
            });
        });
    });
});
