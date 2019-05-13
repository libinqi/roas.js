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
                        service[r].transaction = transaction;
                    }
                }
            };

            let loadTransactionService = (obj: any) => {
                for (let s in obj) {
                    if (obj[s] instanceof Object && Reflect.getMetadata('custom:metaData', target, s) === 'service') {
                        loadTransactionRepository(obj[s]);
                        loadTransactionService(obj[s]);
                    }
                }
            };

            loadTransactionRepository(target);
            loadTransactionService(target);

            try {
                let result = await originalMethod.apply(target, args);
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