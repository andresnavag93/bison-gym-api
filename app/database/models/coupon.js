'use strict';
module.exports = (sequelize, DataTypes) => {
  const Coupon = sequelize.define(
    'Coupon',
    {
      classId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'class_id',
        references: {
          model: 'disciplines',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      serial: {
        allowNull: false,
        type: DataTypes.STRING(50)
      },
      discount: {
        allowNull: false,
        type: DataTypes.REAL
      },
      isActive: {
        allowNull: false,
        field: 'is_active',
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
      tableName: 'coupons',
      indexes: [{ unique: true, fields: ['classId', 'serial'] }]
    }
  );
  Coupon.associate = function(models) {
    Coupon.belongsTo(models.Class, {
      as: 'class',
      foreignKey: 'classId'
    });
    Coupon.hasMany(models.Participant, {
      as: 'participants',
      foreignKey: 'couponId'
    });
    Coupon.hasMany(models.Payment, {
      as: 'payments',
      foreignKey: 'couponId'
    });
  };
  return Coupon;
};
