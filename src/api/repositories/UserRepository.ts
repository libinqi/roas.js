import { models } from '../models';
import { Transaction } from 'sequelize';
import { DbContext } from './utils/DbContext';

export class UserRepository extends DbContext {
    constructor(transaction?: Transaction) {
        super(models.User, transaction);
    }
}