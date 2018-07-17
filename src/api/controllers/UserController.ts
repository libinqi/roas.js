import * as errors from '../../config/errors';
import { logger } from '../../middleware/log';
import { route, HttpMethod } from '../../lib/router';
import { Controller } from '../../lib/controller';
import { Service } from '../../lib/service';
import { UserService } from '../services';
import { User } from '../models/User';

export default class UserController extends Controller {
    @Service()
    userService: UserService;

    @route('/getUserList')
    async list() {
        try {
            this.ctx.body = await this.userService.getUserList();
        } catch (error) {
            this.ctx.throw(error);
        }
    }

    @route('/getUserCount')
    async count() {
        try {
            this.ctx.body = await this.userService.getUserCount();
        } catch (error) {
            this.ctx.throw(error);
        }
    }

    @route('/getUser')
    async getUser() {
        try {
            let userId = this.ctx.query.userId;
            if (!userId) {
                this.ctx.throw(errors.customErrors.notUserId);
            }

            let user: User = await this.userService.getUser(userId);
            this.ctx.body = user;
        } catch (error) {
            this.ctx.throw(error);
        }
    }

    @route('/getUser', HttpMethod.WS)
    async getUserForWS() {
        try {
            let userId = this.ctx.body.userId;
            if (!userId) {
                this.ctx.throw(errors.customErrors.notUserId);
            }
            let user: User = await this.userService.getUser(userId);
            this.ctx.socket.emit('data', user);
        } catch (error) {
            this.ctx.socket.emit('error', error);
        }
    }
}
