/* eslint-disable no-unused-vars */
'use strict';
module.exports = (sequelize, DataTypes) => {
  const Room = sequelize.define(
    'Room',
    {
      gymId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'gym_id',
        references: {
          model: 'gyms',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      name: {
        type: DataTypes.STRING(50)
      },
      capacity: {
        type: DataTypes.INTEGER
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
      tableName: 'rooms'
    }
  );
  Room.associate = function(models) {
    Room.belongsTo(models.Gym, { as: 'gym', foreignKey: 'gymId' });
    Room.hasMany(models.Class, {
      as: 'classes',
      foreignKey: 'roomId'
    });
  };
  return Room;
};
