import * as errors from '../../config/errors';
import { logger } from '../../middleware/log';
import { UserService } from '../services';
import { UserAttributes } from '../models/User';

export async function list(ctx) {
    try {
        ctx.body = await new UserService().getUserList();
    } catch (error) {
        ctx.throw(500, error);
    }
}

export async function count(ctx) {
    try {
        ctx.body = await new UserService().getUserCount();
    } catch (error) {
        ctx.throw(error);
    }
}

export async function getUser(ctx) {
    try {
        let userId = ctx.query.userId;
        if (!userId) {
            ctx.throw(errors.customErrors.notUserId);
        }

        let user: UserAttributes = await new UserService().getUser(userId);
        ctx.body = user;
    } catch (error) {
        ctx.throw(error);
    }
}

export async function getUserForWS(ctx) {
    try {
        let userId = ctx.data.userId;
        if (!userId) {
            ctx.throw(errors.customErrors.notUserId);
        }
        let user: UserAttributes = await new UserService().getUser(userId);
        ctx.socket.emit('data', user);
    } catch (error) {
        ctx.socket.emit('error', error);
    }
}