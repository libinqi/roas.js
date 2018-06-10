import * as fs from 'fs';
import * as path from 'path';
import * as  Sequelize from 'sequelize';
import * as appConfig from '../../config/config';
import * as database from '../../config/database';
import Debug from 'debug';

const debug = Debug('sequelize');
const config = database[appConfig.env];
const db: any = {};

let _models;
let _sequelize;

_sequelize = new Sequelize(config.database, config.username, config.password, Object.assign({}, config, {
    logging: appConfig.env === 'development' ? true : false,
    underscored: true,
    underscoredAll: true,
    isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.READ_COMMITTED,
    define: {
        paranoid: true,
        underscored: true,
        freezeTableName: true,
        schemaDelimiter: '_',
        createdAt: 'createdAt',
        updatedAt: 'updatedAt',
        deletedAt: 'deletedAt'
    },
}));

const loadModels = (modelsPath, schema) => {
    fs.readdirSync(modelsPath).forEach(filename => {
        let modelPath = path.resolve(modelsPath, filename),
            stats = fs.lstatSync(modelPath),
            isDirectory = stats.isDirectory(),
            validNameRegex = /^(.+)\.(js|ts|json)/,
            isValidFile = validNameRegex.test(filename) || isDirectory;

        // keep .js, .json or directory
        if (!isValidFile || filename === path.basename(module.filename)) { return; }

        // load model recursively
        if (isDirectory) {
            loadModels(modelPath, '');
        } else {
            let model = require(modelPath),
                name = filename.match(validNameRegex)[1];

            // if ('function' !== typeof attributes) {
            //     throw new Error(`实体${name}'的attributes没有找到`);
            // }

            if (!_sequelize.isDefined(name)) {
                if (model.attributes && 'function' === typeof model.attributes) {
                    let {
                        options = {}, attributes
                    } = model;

                    if (schema) {
                        options.schema = schema;
                    }
                    _sequelize.define(name, attributes(Sequelize), options);
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

            debug(`model: ${model.name},associations: [${Object.keys(model.associations).join()}]`);
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