import { logger } from '../../middleware/log';
import { User } from '../models/User';
import { Repository, UserRepository } from '../repositories';

export class UserService {
    @Repository()
    private userRepository: UserRepository;

    constructor() {
    }

    async addUser(user: User): Promise<User> {
        try {
            let createdUser: User = await this.userRepository.createUser(user);

            if (createdUser) {
                logger.info(`创建用户成功： ${createdUser.name}.`);
            }

            return createdUser;
        } catch (error) {
            logger.error(error.message);
            throw error;
        }
    }

    async getUserList(): Promise<User[]> {
        try {
            let userList: User[] = await this.userRepository.findUserList();

            return userList;
        } catch (error) {
            logger.error(error.message);
            throw error;
        }
    }

    async getUserCount(): Promise<number> {
        try {
            let count: number = await this.userRepository.findUserCount();

            return count;
        } catch (error) {
            logger.error(error.message);
            throw error;
        }
    }

    async getUser(id: number): Promise<User> {
        try {
            let user: User = await this.userRepository.findUser(id);

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