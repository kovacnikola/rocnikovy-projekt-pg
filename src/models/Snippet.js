'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Snippet extends Model {
        static associate(models) {
            Snippet.hasMany(models.Comment, {
                foreignKey: {
                    name: 'snippet',
                },
                as: 'comments',
            });
            Snippet.belongsTo(models.User, {
                foreignKey: {
                    name: 'author',
                },
                targetKey: 'id',
            });
        }
    }
    Snippet.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            description: DataTypes.TEXT,
            filename: DataTypes.STRING,
            code: DataTypes.TEXT,
            author: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: 'Snippet',
        }
    );
    return Snippet;
};
