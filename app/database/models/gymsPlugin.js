'use strict';
module.exports = (sequelize, DataTypes) => {
  const GymsPlugin = sequelize.define(
    'GymsPlugin',
    {
      gymId: {
        allowNull: false,
        field: 'gym_id',
        type: DataTypes.INTEGER,
        references: {
          model: 'gyms',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      pluginId: {
        allowNull: false,
        field: 'plugin_id',
        type: DataTypes.INTEGER,
        references: {
          model: 'plugins',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      is_active: {
        field: 'isActive',
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
      tableName: 'gyms_plugins',
      indexes: [{ unique: true, fields: ['gymId', 'pluginId'] }]
    }
  );
  GymsPlugin.associate = function(models) {
    GymsPlugin.belongsTo(models.Gym, {
      as: 'gym',
      foreignKey: 'gymId'
    });
    GymsPlugin.belongsTo(models.Plugin, {
      as: 'plugin',
      foreignKey: 'pluginId'
    });
  };
  return GymsPlugin;
};
