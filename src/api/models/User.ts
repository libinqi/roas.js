import * as Sequelize from 'sequelize';
import { Instance, DataTypes } from 'sequelize';

export interface User {
    id: number;
    name: string;
    nickname?: string;
}

export interface UserInstance extends Instance<User> {
    dataValues: User;
}

export default function (sequelize: Sequelize.Sequelize, dataTypes: DataTypes) {
    return sequelize.define('User', {
        id: { type: dataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        name: { type: dataTypes.STRING(100), allowNull: false, defaultValue: '' },
        nickname: { type: dataTypes.STRING(100), allowNull: false, defaultValue: '' }
    }, {
            indexes: [{ name: 'user_name_unique', fields: ['name'], unique: true }],
            classMethods: {
                associate: (models) => {
                }
            }
        });
}