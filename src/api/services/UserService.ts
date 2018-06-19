import { logger } from '../../middleware/log';
import { Transaction } from 'sequelize';
import { UserAttributes } from '../models/User';
import { UserRepository, UserContext } from '../repositories';

export class UserService {
    transaction: Transaction;

    @UserRepository()
    private userRepository: UserContext;

    constructor(transaction?: Transaction) {
        this.transaction = transaction || null;
    }

    async createUser(user: UserAttributes): Promise<UserAttributes> {
        try {
            let createdUser: UserAttributes = await this.userRepository.create(user);

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
            let userList: UserAttributes[] = await this.userRepository.find();

            return userList;
        } catch (error) {
            logger.error(error.message);
            throw error;
        }
    }

    async getUserCount(): Promise<number> {
        try {
            let count: number = await this.userRepository.count();

            return count;
        } catch (error) {
            logger.error(error.message);
            throw error;
        }
    }

    async getUser(id: number): Promise<UserAttributes> {
        try {
            let user: UserAttributes = await this.userRepository.findOne({ id });

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