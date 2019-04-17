import * as fs from 'fs';
import * as path from 'path';
import * as moment from 'moment';
import * as  SequelizeStatic from 'sequelize';
import { Sequelize, Models, Transaction } from 'sequelize';
import * as appConfig from '../../config/config';
import * as database from '../../config/database';
import Debug from 'debug';

const debug = Debug('sequelize');
const config = database[appConfig.env];

let _models: Models;
let _sequelize: Sequelize;

_sequelize = new SequelizeStatic(config.database, config.username, config.password, Object.assign({}, config, {
    logging: appConfig.env === 'development' ? true : false,
    underscored: true,
    underscoredAll: true,
    isolationLevel: SequelizeStatic.Transaction.ISOLATION_LEVELS.READ_COMMITTED,
    define: {
        paranoid: true,
        underscored: true,
        freezeTableName: true,
        schemaDelimiter: '_',
        createdAt: 'createdAt',
        updatedAt: 'updatedAt',
        deletedAt: 'deletedAt'
    },
    sync: {
        force: false
    }
}));

const loadModels = (modelsPath, schema) => {
    fs.readdirSync(modelsPath).forEach(filename => {
        let modelPath = path.resolve(modelsPath, filename),
            stats = fs.lstatSync(modelPath),
            isDirectory = stats.isDirectory(),
            validNameRegex = /^(.+)\.(js|ts|json)/,
            isValidFile = validNameRegex.test(filename) || isDirectory;

        // keep .js, .ts, .json or directory
        if (!isValidFile || filename === path.basename(module.filename)) { return; }

        // load model recursively
        if (isDirectory) {
            loadModels(modelPath, '');
        } else {
            let model = require(modelPath),
                name = filename.match(validNameRegex)[1];

            if (!_sequelize.isDefined(name)) {
                if (model.attributes && 'function' === typeof model.attributes) {
                    let {
                        options = {}, attributes
                    } = model;

                    if (schema) {
                        options.schema = schema;
                    }
                    _sequelize.define(name, attributes(SequelizeStatic), options);
                } else {
                    _sequelize.import(modelPath);
                }
            } else {
                debug(`model: ${name},is defined`);
            }
        }
    });
};

const associateModels = () => {
    _models = _sequelize.models;
    if (!global['$models']) {
        global['$models'] = {};
    }
    Object.keys(_models).forEach(key => {
        if (!global['$models'][key]) {
            let model = _models[key];

            if ('associate' in model) {
                model.associate(_models);
            }

            global[key] = model;

            if (!_sequelize.options.sync.force) {
                model.sync = (options) => {
                    return null;
                };
            }

            debug(`model: ${model.name},associations: [${Object.keys((<any>model).associations).join()}]`);
        }
    });
};

const dynamicLoadModels = (modelsPath, schema) => {
    if (typeof (modelsPath) === 'object') {
        for (let path of modelsPath) {
            loadModels(path, schema);
        }
    } else {
        loadModels(modelsPath, schema);
    }

    associateModels();
};

dynamicLoadModels(__dirname, '');

export const sequelize = _sequelize;
export const models = _models;

let createdTime;
export const db = {
    transaction: null,
    createTransaction: async (isolationLevel: SequelizeStatic.TransactionIsolationLevel, autocommit: boolean = false) => {
        createdTime = new Date();
        return await sequelize.transaction({
            autocommit,
            isolationLevel
        });
    },
    beginTransaction: async (timeout: number = 60000) => {
        if (!db.transaction) {
            db.transaction = await db.createTransaction(sequelize.Transaction.ISOLATION_LEVELS.READ_UNCOMMITTED, true);
            return db.transaction;
        } else {
            if (db.transaction && db.transaction.finished === 'commit') {
                db.transaction = await db.createTransaction(sequelize.Transaction.ISOLATION_LEVELS.READ_UNCOMMITTED, true);
                return db.transaction;
            } else {
                while (moment(new Date()).diff(createdTime) <= timeout) {
                    return await db.beginTransaction();
                }

                while (moment(new Date()).diff(createdTime) > timeout) {
                    try {
                        if (db.transaction && db.transaction.finished !== 'commit') {
                            await db.transaction.commit();
                            db.transaction = null;
                        }
                        db.transaction = await db.createTransaction(sequelize.Transaction.ISOLATION_LEVELS.READ_UNCOMMITTED, true);
                        return db.transaction;
                    } catch (error) {
                        if (db.transaction && db.transaction.rollback) {
                            await db.transaction.rollback();
                            db.transaction = null;
                        }
                    }
                }
            }
        }
    },
    commitTransaction: async () => {
        if (db.transaction && db.transaction.finished !== 'commit') {
            await db.transaction.commit();
            db.transaction = null;
        }
    },
    rollbackTransaction: async () => {
        if (db.transaction && db.transaction.rollback && db.transaction.finished !== 'commit') {
            await db.transaction.rollback();
            db.transaction = null;
        }
    },
    closeTransaction: async () => {
        try {
            if (db.transaction && db.transaction.finished !== 'commit') {
                await db.transaction.commit();
            }
        } catch (error) {
            if (db.transaction && db.transaction.rollback) {
                await db.transaction.rollback();
            }
        }
        db.transaction = null;
    }
};