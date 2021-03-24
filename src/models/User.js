'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        static associate(models) {
            User.hasMany(models.Snippet, {
                foreignKey: {
                    name: 'author',
                },
                as: 'snippets',
            });
        }
    }
    User.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            sub: {
                type: DataTypes.BIGINT,
                unique: true,
            },
            displayName: DataTypes.STRING,
            givenName: DataTypes.STRING,
            familyName: DataTypes.STRING,
            email: DataTypes.STRING,
            picture: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: 'User',
            paranoid: true,
        }
    );
    return User;
};
