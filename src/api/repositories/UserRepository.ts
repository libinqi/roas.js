import { models } from '../models';
import { Transaction } from 'sequelize';
import { DbContext } from './base/DbContext';

export class UserContext extends DbContext {
    constructor(transaction?: Transaction) {
        super(models.User, transaction);
    }
}

export function UserRepository() {
    return (target, propertyKey: string): void => {
        target[propertyKey] = new UserContext(target.transaction || null);
    };
}
