/* eslint-disable no-unused-vars */
'use strict';
module.exports = (sequelize, DataTypes) => {
  const UsersGroup = sequelize.define(
    'UsersGroup',
    {
      userId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'user_id',
        references: {
          model: 'users',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      groupId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'group_id',
        references: {
          model: 'attributes',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      gymId: {
        type: DataTypes.INTEGER,
        field: 'gym_id',
        references: {
          model: 'gyms',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      admissionDate: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'admission_date'
      },
      rating: {
        type: DataTypes.REAL,
        validate: { len: [1, 5] }
      },
      points: DataTypes.INTEGER,
      ratingCount: {
        type: DataTypes.INTEGER,
        field: 'rating_count'
      },
      ratingSum: {
        type: DataTypes.INTEGER,
        field: 'rating_sum'
      },
      gymRating: {
        type: DataTypes.INTEGER,
        field: 'gym_rating'
      },
      isActive: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
        field: 'is_active'
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
      tableName: 'users_groups',
      indexes: [{ unique: true, fields: ['userId', 'groupId', 'gymId'] }]
    }
  );
  UsersGroup.associate = function(models) {
    UsersGroup.belongsTo(models.Attribute, {
      as: 'group',
      foreignKey: 'groupId'
    });
    UsersGroup.belongsTo(models.Gym, { as: 'gym', foreignKey: 'gymId' });
    UsersGroup.belongsTo(models.User, { as: 'user', foreignKey: 'userId' });

    UsersGroup.hasMany(models.SecurityCode, {
      as: 'securityCodes',
      foreignKey: 'userGroupId'
    });
    UsersGroup.hasMany(models.Penalty, {
      as: 'penalties',
      foreignKey: 'userGroupId'
    });
    UsersGroup.hasMany(models.IdsPhone, {
      as: 'idsPhones',
      foreignKey: 'userGroupId'
    });
    UsersGroup.hasMany(models.DisciplinesUsersGroup, {
      as: 'disciplinesUsersGroup',
      foreignKey: 'userGroupId'
    });
    UsersGroup.hasMany(models.Participant, {
      as: 'participants',
      foreignKey: 'userGroupId'
    });
    UsersGroup.hasMany(models.Participant, {
      as: 'coaches',
      foreignKey: 'userGroupId'
    });
    UsersGroup.hasMany(models.Payment, {
      as: 'payments',
      foreignKey: 'userGroupId'
    });
    UsersGroup.hasMany(models.PlansUsersGroup, {
      as: 'plansUsersGroups',
      foreignKey: 'userGroupId'
    });
    UsersGroup.hasMany(models.Media, {
      as: 'media',
      foreignKey: 'userGroupId'
    });
  };
  return UsersGroup;
};
