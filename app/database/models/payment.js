'use strict';
module.exports = (sequelize, DataTypes) => {
  const Payment = sequelize.define(
    'Payment',
    {
      bankId: {
        type: DataTypes.INTEGER,
        field: 'bank_id',
        references: {
          model: 'attributes',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      classId: {
        type: DataTypes.INTEGER,
        field: 'class_id',
        references: {
          model: 'classes',
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
      statusId: {
        allowNull: false,
        field: 'status_id',
        type: DataTypes.INTEGER,
        references: {
          model: 'attributes',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      currencyId: {
        allowNull: false,
        field: 'currency_id',
        type: DataTypes.INTEGER,
        references: {
          model: 'attributes',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      description: {
        type: DataTypes.TEXT
      },
      amount: {
        allowNull: false,
        type: DataTypes.DECIMAL
      },
      referenceNumber: {
        field: 'reference_number',
        type: DataTypes.STRING(30)
      },
      date: {
        allowNull: false,
        type: DataTypes.DATE
      },
      customerId: {
        field: 'customer_id',
        type: DataTypes.STRING(50)
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
      tableName: 'payments'
    }
  );
  Payment.associate = function(models) {
    Payment.belongsTo(models.Bank, {
      as: 'bank',
      foreignKey: 'bankId'
    });
    Payment.belongsTo(models.Class, {
      as: 'class',
      foreignKey: 'classId'
    });
    Payment.belongsTo(models.Coupon, {
      as: 'coupon',
      foreignKey: 'couponId'
    });
    Payment.belongsTo(models.UsersGroup, {
      as: 'usersGroup',
      foreignKey: 'userGroupId'
    });
    Payment.belongsTo(models.Attribute, {
      as: 'status',
      foreignKey: 'statusId'
    });
    Payment.belongsTo(models.Attribute, {
      as: 'currency',
      foreignKey: 'currencyId'
    });
    Payment.hasMany(models.PlansUsersGroup, {
      as: 'plansUsersGroups',
      foreignKey: 'paymentId'
    });
  };
  return Payment;
};
