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