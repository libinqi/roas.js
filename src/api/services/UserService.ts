import { logger } from '../../middleware/log';
import { sequelize, models } from '../models';
import { Transaction } from 'sequelize';
import { UserAttributes, UserInstance } from '../models/User';

export class UserService {
    transaction: Transaction;

    constructor(transaction?: Transaction) {
        this.transaction = transaction || null;
    }

    async createUser(user: UserAttributes): Promise<UserAttributes> {
        try {
            let createdUser: UserAttributes = await models.User.create(user, {
                raw: true,
                transaction: this.transaction
            });

            if (createdUser) {
                logger.info(`创建用户成功： ${createdUser.name}.`);
            }

            return createdUser;
        } catch (error) {
            logger.error(error.message);
            throw error;
        }
    }

    async getUserList(): Promise<UserAttributes[]> {
        try {
            let userList: UserAttributes[] = await models.User.findAll({
                transaction: this.transaction,
                raw: true
            });

            return userList;
        } catch (error) {
            logger.error(error.message);
            throw error;
        }
    }

    async getUser(id: number): Promise<UserAttributes> {
        try {
            let user: UserAttributes = await models.User.findById(id, {
                transaction: this.transaction,
                raw: true
            });

            if (user) {
                logger.info(`获取到用户：${user.name}.`);
            } else {
                logger.info(`用户Id不存在：${id}.`);
            }

            return user;
        } catch (error) {
            logger.error(error.message);
            throw error;
        }
    }
}