'use strict';
import fs from 'fs';
import path from 'path';
const debug = require('debug')('sequelize')
import Sequelize from 'sequelize';
import {env} from '../config/config.js';
import database from '../config/database.js';

const config = database[env];
const db = {};
let sequelize = null;
if (config.use_env_variable) {
    sequelize = new Sequelize(process.env[config.use_env_variable]);
} else {
    sequelize = new Sequelize(config.database, config.username, config.password, Object.assign({}, config, {
        logging: debug,
        underscored: true,
        underscoredAll: true,
        define: {
            paranoid: true,
            underscored: true,
            freezeTableName: true,
            schemaDelimiter: '_',
            createdAt: 'created_at',
            updatedAt: 'updated_at',
            deletedAt: 'deleted_at'
        },
    }));
}

export default  function (dir, schema = '') {
    let models_path = dir || path.join(__dirname, '../', 'api/models');

    const loadModels = (modelsPath, schema) => {
        fs.readdirSync(modelsPath).forEach(filename => {
            let modelPath = path.resolve(modelsPath, filename),
                stats = fs.lstatSync(modelPath),
                isDirectory = stats.isDirectory(),
                validNameRegex = /^(.+)\.(js|json)/,
                isValidFile = validNameRegex.test(filename) || isDirectory;

            // keep .js, .json or directory
            if (!isValidFile) return;

            // load model recursively
            if (isDirectory) {
                loadModels(modelPath, filename);
            } else {
                let model = require(modelPath),
                    name = filename.match(validNameRegex)[1];

                let {
                    options = {}, attributes
                } = model;

                if (schema) {
                    options.schema = schema;
                }

                if ('function' !== typeof attributes) {
                    throw new Error(`实体${name}'的attributes没有找到`);
                }

                sequelize.define(name, attributes(Sequelize), options);
            }
        })
    }

    const associateModels = ()=> {
        const models = sequelize.models;
        Object.keys(models).forEach(key => {

            let model = models[key];

            if ('associate' in model) {
                model.associate(models);
            }

            global[key] = model;

            debug(`model: ${model.name},associations: [${Object.keys(model.associations).join()}]`);
        });
        global.$models = models;
    }

    loadModels(models_path, schema);
    associateModels();

    db.sequelize = sequelize;
    db.Sequelize = Sequelize;

    global.db = db;

    return db;
}