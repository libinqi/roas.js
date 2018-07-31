import { models } from '../models';
import { Transaction } from 'sequelize';
import { DbContext } from './utils/DbContext';
import { User } from '../models/User';

export class UserRepository extends DbContext {
    constructor(transaction?: Transaction) {
        super(models.User, transaction);
    }

    async createUser(user: User): Promise<User> {
        try {
            return await this.create(user);
        } catch (error) {
            throw error;
        }
    }

    async findUserList(): Promise<User[]> {
        try {
            return await this.find();
        } catch (error) {
            throw error;
        }
    }

    async findUserCount(): Promise<number> {
        try {
            return await this.count();
        } catch (error) {
            throw error;
        }
    }

    async findUser(id: number): Promise<User> {
        try {
            return await this.findOne({ id });
        } catch (error) {
            throw error;
        }
    }
}