export class UserService {
    constructor(transaction) {
        this.transaction = transaction || null;
    }

    async getUser(id) {
        let data = await User.findById(id, {
            transaction: this.transaction,
            raw: true,
            nest: true
        });
        return data;
    }
}