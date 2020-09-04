'use strict';
module.exports = (sequelize, DataTypes) => {
  const Participant = sequelize.define(
    'Participant',
    {
      classId: {
        allowNull: false,
        field: 'class_id',
        type: DataTypes.INTEGER,
        references: {
          model: 'classes',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      userGroupId: {
        allowNull: false,
        field: 'user_group_id',
        type: DataTypes.INTEGER,
        references: {
          model: 'users_groups',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      couponId: {
        type: DataTypes.INTEGER,
        field: 'coupon_id',
        references: {
          model: 'coupons',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      seat: {
        type: DataTypes.INTEGER
      },
      rating: {
        type: DataTypes.REAL,
        validate: { len: [1, 5] }
      },
      points: {
        type: DataTypes.INTEGER
      },
      isWaiting: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
        field: 'is_waiting'
      },
      attended: {
        type: DataTypes.BOOLEAN
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
      tableName: 'participants',
      indexes: [{ unique: true, fields: ['userGroupId', 'classId'] }]
    }
  );
  Participant.associate = function(models) {
    Participant.belongsTo(models.Class, {
      as: 'class',
      foreignKey: 'classId'
    });
    Participant.belongsTo(models.UsersGroup, {
      as: 'usersGroup',
      foreignKey: 'userGroupId'
    });
    Participant.belongsTo(models.Coupon, {
      as: 'coupon',
      foreignKey: 'couponId'
    });
  };
  return Participant;
};
