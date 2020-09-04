'use strict';
module.exports = (sequelize, DataTypes) => {
  const Media = sequelize.define(
    'Media',
    {
      gymId: {
        type: DataTypes.INTEGER,
        field: 'gym_id',
        references: {
          model: 'gyms',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      disciplineId: {
        type: DataTypes.INTEGER,
        field: 'discipline_id',
        references: {
          model: 'disciplines',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      planId: {
        type: DataTypes.INTEGER,
        field: 'plan_id',
        references: {
          model: 'plans',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      postId: {
        type: DataTypes.INTEGER,
        field: 'post_id',
        references: {
          model: 'posts',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      userGroupId: {
        type: DataTypes.INTEGER,
        field: 'user_group_id',
        references: {
          model: 'users_groups',
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
      url: {
        allowNull: false,
        type: DataTypes.STRING(100)
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
      tableName: 'media'
    }
  );
  Media.associate = function(models) {
    Media.belongsTo(models.Attribute, {
      as: 'type',
      foreignKey: 'typeId'
    });
    Media.belongsTo(models.Gym, {
      as: 'gym',
      foreignKey: 'gymId'
    });
    Media.belongsTo(models.Discipline, {
      as: 'discipline',
      foreignKey: 'disciplineId'
    });
    Media.belongsTo(models.Post, {
      as: 'post',
      foreignKey: 'postId'
    });
    Media.belongsTo(models.Plan, {
      as: 'plan',
      foreignKey: 'planId'
    });
    Media.belongsTo(models.UsersGroup, {
      as: 'usersGroup',
      foreignKey: 'userGroupId'
    });
  };
  return Media;
};
