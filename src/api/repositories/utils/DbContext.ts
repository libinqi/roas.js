/**
 * 
 * 数据库公共操作基类
 * Created by libinqi on 2018/06/14.
 * 
 */
import { Transaction } from 'sequelize';

export class DbContext {
    private model;
    private transaction: Transaction;

    constructor(model: any, transaction?: Transaction) {
        this.model = model;
        this.transaction = transaction || null;
    }

    protected async create(obj: object): Promise<any> {
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

    protected async bulkCreate(array: any[]): Promise<any[]> {
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

    protected async delete(criteria: any, force: boolean = false) {
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

    protected async update(obj: any, criteria?: object) {
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

    protected async find(where?: object, options?: object): Promise<any[]> {
        try {
            options = options || { raw: true };
            let data: any[] = await this.model.findAll(Object.assign({}, options, { where: where || {} }));
            return data;
        } catch (error) {
            throw error;
        }
    }

    protected async findById(id: number): Promise<any> {
        try {
            let data: any = await this.model.findById(id, {
                raw: true
            });
            return data;
        } catch (error) {
            throw error;
        }
    }

    protected async findOne(where: object, options?: object): Promise<any> {
        try {
            options = options || { raw: true };
            let data: any = await this.model.findOne(Object.assign({}, options, { where: where || {} }));
            return data;
        } catch (error) {
            throw error;
        }
    }

    protected async findMax(col?: string, where?: object) {
        try {
            let data: any = await this.model.findOne({ where: where || {}, order: [[col || 'id', 'DESC']], raw: true });
            return data;
        } catch (error) {
            throw error;
        }
    }

    protected async findMin(col?: string, where?: object) {
        try {
            let data: any = await this.model.findOne({ where: where || {}, order: [[col || 'id', 'ASC']], raw: true });
            return data;
        } catch (error) {
            throw error;
        }
    }

    protected async findAndCountAll(where?: object, limit?: number, offset?: number) {
        try {
            let data: any = await this.model.findAndCountAll({
                where: where || {},
                offset: offset || 0,
                limit: limit
            });
            return data;
        } catch (error) {
            throw error;
        }
    }

    protected async max(col?: string, where?: object) {
        try {
            let data: any = await this.model.max(col || 'id', { where: where || {} });
            return data;
        } catch (error) {
            throw error;
        }
    }

    protected async min(col?: string, where?: object) {
        try {
            let data: any = await this.model.min(col || 'id', { where: where || {} });
            return data;
        } catch (error) {
            throw error;
        }
    }

    protected async sum(col?: string, where?: object) {
        try {
            let data: any = await this.model.sum(col || 'id', { where: where || {} });
            return data;
        } catch (error) {
            throw error;
        }
    }

    protected async count(where?: object) {
        try {
            let count: number = await this.model.count({ where: where || {} });
            return count;
        } catch (error) {
            throw error;
        }
    }
}