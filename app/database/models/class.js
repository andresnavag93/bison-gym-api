'use strict';
module.exports = (sequelize, DataTypes) => {
  const Class = sequelize.define(
    'Class',
    {
      disciplineId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'discipline_id',
        references: {
          model: 'disciplines',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      roomId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'room_id',
        references: {
          model: 'rooms',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      typeId: {
        type: DataTypes.INTEGER,
        field: 'type_id',
        references: {
          model: 'attributes',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      startDate: {
        allowNull: false,
        field: 'start_date',
        type: DataTypes.DATE
      },
      endDate: {
        allowNull: false,
        field: 'end_date',
        type: DataTypes.DATE
      },
      price: {
        type: DataTypes.DECIMAL
      },
      capacity: {
        type: DataTypes.INTEGER
      },
      rating: {
        type: DataTypes.REAL
      },
      ratingCount: {
        type: DataTypes.INTEGER,
        field: 'rating_count'
      },
      ratingSum: {
        type: DataTypes.INTEGER,
        field: 'rating_sum'
      },
      isActive: {
        allowNull: false,
        field: 'is_active',
        type: DataTypes.BOOLEAN
      },
      points: {
        type: DataTypes.INTEGER
      },
      currencyId: {
        type: DataTypes.INTEGER,
        field: 'currency_id',
        references: {
          model: 'attributes',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
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
      tableName: 'classes'
    }
  );
  Class.associate = function(models) {
    Class.belongsTo(models.Discipline, {
      as: 'discipline',
      foreignKey: 'disciplineId'
    });

    Class.belongsTo(models.Attribute, {
      as: 'type',
      foreignKey: 'typeId'
    });
    Class.belongsTo(models.Room, {
      as: 'room',
      foreignKey: 'roomId'
    });
    Class.belongsTo(models.Attribute, {
      as: 'currency',
      foreignKey: 'currencyId'
    });

    Class.hasMany(models.Coupon, {
      as: 'coupons',
      foreignKey: 'classId'
    });
    Class.hasMany(models.Participant, {
      as: 'participants',
      foreignKey: 'classId'
    });
    Class.hasMany(models.Coach, {
      as: 'coaches',
      foreignKey: 'classId'
    });
    Class.hasMany(models.Payment, {
      as: 'payments',
      foreignKey: 'classId'
    });
  };
  return Class;
};
