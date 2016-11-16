'use strict';

module.exports.attributes = (DataTypes) => {

    return {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },

        name: {
            type: DataTypes.STRING(100),
            allowNull: false,
            defaultValue: ''
        },

        nickname: {
            type: DataTypes.STRING(100),
            allowNull: false,
            defaultValue: ''
        },

        deleted_at: {
            type: DataTypes.DATE,
            allowNull: false,
            /**
             * if this type is DATE,
             * defaultValue must be a Date,
             * otherwise paranoid is useless
             */
            defaultValue: new Date(0)
        }
    }
}

module.exports.options = {

    indexes: [{
        type: 'unique',
        /* Name is important for unique index */
        name: 'user_name_unique',
        fields: ['name']
    }],

    classMethods: {
        associate: (models) => {
        }
    }
}