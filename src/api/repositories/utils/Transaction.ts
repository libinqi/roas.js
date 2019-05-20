import 'reflect-metadata';
import { sequelize } from '../../models';
import { DbContext } from './DbContext';
import * as  SequelizeStatic from 'sequelize';

export function Transaction(isolationLevel?: SequelizeStatic.TransactionIsolationLevel): MethodDecorator {
    return function (target: any, methodName: string, descriptor: PropertyDescriptor) {
        let originalMethod = descriptor.value;

        descriptor.value = async (...args: any[]) => {
            let transaction: SequelizeStatic.Transaction = await sequelize.transaction({
                isolationLevel: isolationLevel || SequelizeStatic.Transaction.ISOLATION_LEVELS.READ_UNCOMMITTED
            });

            let loadTransactionRepository = (service: any) => {
                for (let r in service) {
                    if (service[r] instanceof DbContext) {
                        let c = Reflect.getMetadata('design:type', service, r);
                        service[r] = new c(transaction);
                    }
                }
            };

            let loadTransactionService = (obj: any) => {
                for (let s in obj) {
                    if (obj[s] instanceof Object && Reflect.getMetadata('custom:metaData', obj, s) === 'service') {
                        let c = Reflect.getMetadata('design:type', obj, s);
                        obj[s] = new c(transaction);

                        loadTransactionRepository(obj[s]);
                        loadTransactionService(obj[s]);
                    }
                }
            };

            let c = new target.constructor();

            loadTransactionRepository(c);
            loadTransactionService(c);

            try {
                let result = await originalMethod.apply(c, args);
                await transaction.commit();
                return result;
            } catch (error) {
                if (transaction) {
                    await transaction.rollback();
                }
                throw error;
            } finally {
                transaction = null;
            }
        };
    };
}