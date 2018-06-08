import { logger } from '../../middleware/log';
import { sequelize, models } from '../models';
import { UserAttributes, UserInstance } from '../models/User';

export class UserService {
    transaction;

    constructor(transaction?) {
        this.transaction = transaction || null;
    }

    createUser(user: UserAttributes): Promise<UserAttributes> {
        return new Promise<UserAttributes>((resolve: Function, reject: Function) => {
            return models.User.create(user, {
                raw: true,
                transaction: this.transaction
            }).then((user: UserAttributes) => {
                logger.info(`创建用户成功： ${user.name}.`);
                resolve(user);
            }).catch((error: Error) => {
                logger.error(error.message);
                reject(error);
            });
        });
    }

    getUser(id: number): Promise<UserAttributes> {
        return new Promise<UserAttributes>((resolve: Function, reject: Function) => {
            return models.User.findById(id, {
                transaction: this.transaction,
                raw: true
            }).then((user: UserAttributes) => {
                if (user) {
                    logger.info(`获取到用户：${user.name}.`);
                } else {
                    logger.info(`用户Id不存在：${id}.`);
                }
                resolve(user);
            }).catch((error: Error) => {
                logger.error(error.message);
                reject(error);
            });
        });
    }
}