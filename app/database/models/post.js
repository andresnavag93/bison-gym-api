'use strict';
module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    'Post',
    {
      gymId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'gym_id',
        references: {
          model: 'gyms',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      typeId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'type_id',
        references: {
          model: 'attributes',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      title: {
        allowNull: false,
        type: DataTypes.STRING(50)
      },
      message: {
        allowNull: false,
        type: DataTypes.TEXT
      },
      isDelete: {
        allowNull: false,
        defaultValue: false,
        type: DataTypes.BOOLEAN,
        field: 'is_delete'
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'created_at'
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'updated_at'
      }
    },
    {
      tableName: 'posts'
    }
  );
  Post.associate = function(models) {
    Post.belongsTo(models.Gym, {
      as: 'gym',
      foreignKey: 'gymId'
    });
    Post.belongsTo(models.Attribute, {
      as: 'type',
      foreignKey: 'typeId'
    });
    Post.hasMany(models.Media, {
      as: 'media',
      foreignKey: 'postId'
    });
    // associations can be defined here
  };
  return Post;
};
