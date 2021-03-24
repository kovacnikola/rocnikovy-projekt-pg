'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Comment extends Model {
        static associate(models) {
            Comment.belongsTo(models.Snippet, {
                foreignKey: {
                    name: 'snippet',
                },
                targetKey: 'id',
            });
            Comment.belongsTo(models.User, {
                foreignKey: {
                    name: 'author',
                },
                targetKey: 'id',
            });
        }
    }
    Comment.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            text: DataTypes.TEXT,
            snippet: DataTypes.INTEGER,
            author: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: 'Comment',
        }
    );
    return Comment;
};
