import * as errors from '../../config/errors';
import { UserService } from '../services';

export async function execute(socket: any, data: any) {
    const userId = data;
    const result = await new UserService().getUser(userId);
    socket.write(result ? JSON.stringify(result) : '');
}
