import {
    UserService
} from '../services';

export async function execute(socket, data) {
    let userId = data;
    if (!userId) {
        ctx.throw(errors.CustomErrors.NotUserId);
    }
    let result = await new UserService().getUser(userId);
    socket.write(result ? JSON.stringify(result) : '');
}