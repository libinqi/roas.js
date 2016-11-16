export default class UserService {
    constructor(ctx) {
        this.ctx = ctx;
    }

    async getUser(id) {
        let data = await User.findById(id);
        return data;
    }
}