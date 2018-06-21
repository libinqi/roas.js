/**
 * 
 * 数据库公共操作基类
 * Created by libinqi on 2018/06/14.
 * 
 */
import { Transaction } from 'sequelize';

export class DbContext {
    model;
    transaction: Transaction;

    constructor(model: any, transaction?: Transaction) {
        this.model = model;
        this.transaction = transaction || null;
    }

    async create(obj: object): Promise<any> {
        try {
            let created: any = await this.model.create(obj, {
                raw: true,
                transaction: this.transaction
            });
            if (created && created.dataValues) {
                return created.dataValues;
            } else {
                return null;
            }
        } catch (error) {
            throw error;
        }
    }

    async bulkCreate(array: any[]): Promise<any[]> {
        try {
            let data: any[] = await this.model.bulkCreate(array, {
                raw: true,
                transaction: this.transaction
            });
            let createdModels = [];
            if (data && data.length > 0) {
                for (let model of data) {
                    createdModels.push(model.dataValues);
                }
            }
            return createdModels;
        } catch (error) {
            throw error;
        }
    }

    async delete(criteria: any, force: boolean = false) {
        try {
            if (typeof criteria === 'object') {
                await this.model.destroy({
                    where: criteria,
                    force: force,
                    transaction: this.transaction
                });
            } else if (typeof criteria === 'number') {
                await this.model.destroy({
                    where: { id: criteria },
                    force: force,
                    transaction: this.transaction
                });
            }
            return true;
        } catch (error) {
            throw error;
        }
    }

    async update(obj: any, criteria?: object) {
        try {
            let options = { where: {}, transaction: this.transaction };
            if (!criteria) {
                if (!obj.id) {
                    throw '对象的id为空,无法更新';
                }
                options.where = { id: obj.id };
            } else {
                options.where = criteria;
            }
            await this.model.update(obj, options);
            return true;
        } catch (error) {
            throw error;
        }
    }

    async find(where?: object, options?: object): Promise<any[]> {
        try {
            options = options || { raw: true };
            let data: any[] = await this.model.findAll({ where: where || {} }, options);
            return data;
        } catch (error) {
            throw error;
        }
    }

    async findById(id: number): Promise<any> {
        try {
            let data: any = await this.model.findById(id, {
                raw: true
            });
            return data;
        } catch (error) {
            throw error;
        }
    }

    async findOne(where: object, options?: object): Promise<any> {
        try {
            options = options || { raw: true };
            let data: any = await this.model.findOne({ where: where }, options);
            return data;
        } catch (error) {
            throw error;
        }
    }

    async findAndCountAll(where?: object, offset?: number, limit?: number) {
        try {
            let data: any = await this.model.findAndCountAll({
                where: where || {},
                offset: offset,
                limit: limit
            });
            return data;
        } catch (error) {
            throw error;
        }
    }

    async count(where?: object) {
        try {
            let count: number = await this.model.count({ where: where || {} });
            return count;
        } catch (error) {
            throw error;
        }
    }
}